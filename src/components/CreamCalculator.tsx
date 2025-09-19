import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Calculator, Package, TrendingUp, TrendingDown, DollarSign, Settings, CheckCircle, XCircle, Plus, Trash2, Beaker, ArrowLeft } from 'lucide-react';

// ================================
// Face Cream BOM & P/L Calculator (BIDUA Beauty Theme)
// Recipe-Based System with Base Material
// ================================

export default function CreamCalculator() {
  // --- Ingredient Structure ---
  const createIngredient = (name, quantity, unit, bulkPrice, bulkUnit, type = 'additive', density = 1.0) => ({
    id: Date.now() + Math.random(),
    name,
    quantity, // For base: quantity per jar, For additive: quantity per base unit
    unit, // 'g' or 'ml'
    bulkPrice, // Rs per kg or Rs per L
    bulkUnit, // 'kg' or 'L'
    type, // 'base' or 'additive'
    density // g/ml (only relevant for ml units)
  });

  // --- Defaults ---
  const DEFAULTS = {
    jarSizeG: 50,
    numJars: 100,
    ingredients: [
      createIngredient('Base Cream Material', 0, 'g', 6000, 'kg', 'base'), // Auto-calculated
      createIngredient('Saffron Oil', 250, 'ml', 11000, 'L', 'additive', 1.0), // 250ml per 1kg base
      createIngredient('Essential Oil', 50, 'ml', 8000, 'L', 'additive', 0.9), // 50ml per 1kg base
    ],
    boxCost: 4,
    jarCost: 135,
    stickerCost: 2,
    transportPer50g: 100, // Rs per 50g pack
    otherOpPerJar: 0,
    mrp: 4999,
    distributorPrice: 1499,
  };

  // --- Inputs ---
  const [jarSizeG, setJarSizeG] = useState(DEFAULTS.jarSizeG);
  const [numJars, setNumJars] = useState(DEFAULTS.numJars);
  const [ingredients, setIngredients] = useState(DEFAULTS.ingredients);
  const [boxCost, setBoxCost] = useState(DEFAULTS.boxCost);
  const [jarCost, setJarCost] = useState(DEFAULTS.jarCost);
  const [stickerCost, setStickerCost] = useState(DEFAULTS.stickerCost);
  const [transportPer50g, setTransportPer50g] = useState(DEFAULTS.transportPer50g);
  const [otherOpPerJar, setOtherOpPerJar] = useState(DEFAULTS.otherOpPerJar);
  const [mrp, setMrp] = useState(DEFAULTS.mrp);
  const [distributorPrice, setDistributorPrice] = useState(DEFAULTS.distributorPrice);

  // --- Formatters ---
  const fmt = useMemo(() => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }), []);
  const fmtNum = useMemo(() => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }), []);

  // --- Ingredient Management ---
  const addIngredient = () => {
    setIngredients([...ingredients, createIngredient('New Ingredient', 100, 'ml', 1000, 'L', 'additive')]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id) {
        // If changing type to base, make sure only one base exists
        if (field === 'type' && value === 'base') {
          // First, change all other ingredients to additive
          const updatedIngredients = ingredients.map(otherIng => 
            otherIng.id !== id ? { ...otherIng, type: 'additive' } : otherIng
          );
          // Then update this ingredient to base
          return { ...ing, [field]: value };
        }
        return { ...ing, [field]: value };
      }
      // If we're setting a new base, change existing base to additive
      if (field === 'type' && value === 'base' && ing.type === 'base') {
        return { ...ing, type: 'additive' };
      }
      return ing;
    }));
  };

  // --- Core calculations ---
  const data = useMemo(() => {
    const totalOutputG = safe(numJars) * safe(jarSizeG);

    // Find the base ingredient
    const baseIngredient = ingredients.find(ing => ing.type === 'base');
    const additiveIngredients = ingredients.filter(ing => ing.type === 'additive');

    if (!baseIngredient) {
      // No base ingredient defined, return empty calculations
      return {
        totalOutputG,
        calculatedBaseQuantity: 0,
        ingredientCosts: [],
        totalMaterialCost: 0,
        packagingPerJar: safe(boxCost) + safe(jarCost) + safe(stickerCost),
        transportPerJar: safe(transportPer50g) * (safe(jarSizeG) / 50),
        materialPerJar: 0,
        totalCostPerJar: 0,
        profitPerJarMRP: 0,
        profitPerJarDist: 0,
        marginMRP: 0,
        marginDist: 0,
        totalPackaging: 0,
        totalTransport: 0,
        totalOtherOp: 0,
        totalBatchCost: 0,
        totalRevenueMRP: 0,
        totalRevenueDist: 0,
        totalProfitMRP: 0,
        totalProfitDist: 0,
        hasBaseIngredient: false,
      };
    }

    // Auto-calculate base quantity based on additives and jar size
    // Calculate total additive volume/weight needed per base unit
    let totalAdditiveVolumePerBaseUnit = 0;
    
    additiveIngredients.forEach(ing => {
      const additiveQuantity = safe(ing.quantity);
      if (ing.unit === 'ml') {
        // Convert ml to g using density for weight calculation
        const density = safe(ing.density) || 1.0;
        totalAdditiveVolumePerBaseUnit += (additiveQuantity / 1000) * density; // Convert to kg equivalent
      } else {
        // Already in grams, convert to kg
        totalAdditiveVolumePerBaseUnit += additiveQuantity / 1000;
      }
    });
    
    // Calculate base quantity per jar to fill remaining space
    // Assume additives take up space proportional to base
    const targetJarSizeKg = safe(jarSizeG) / 1000;
    const baseRatio = 1; // 1 unit of base
    const totalRatio = baseRatio + totalAdditiveVolumePerBaseUnit;
    
    // Calculate base quantity per jar
    const calculatedBaseQuantityKg = (targetJarSizeKg * baseRatio) / totalRatio;
    const calculatedBaseQuantityG = calculatedBaseQuantityKg * 1000;
    
    // Use calculated base quantity
    const baseQuantityPerJar = calculatedBaseQuantityG;
    const baseBulkPrice = safe(baseIngredient.bulkPrice);
    const baseBulkUnit = baseIngredient.bulkUnit;
    
    let basePricePerUnit;
    if (baseBulkUnit === 'kg') {
      basePricePerUnit = baseBulkPrice / 1000; // Rs per gram
    } else if (baseBulkUnit === 'L') {
      basePricePerUnit = baseBulkPrice / 1000; // Rs per ml
    } else {
      basePricePerUnit = baseBulkPrice;
    }
    
    const baseCostPerJar = baseQuantityPerJar * basePricePerUnit;
    const baseTotalCostForBatch = baseCostPerJar * safe(numJars);
    
    // Calculate base quantity needed for batch
    let baseTotalQuantityNeeded = baseQuantityPerJar * safe(numJars);
    if (baseIngredient.unit === 'ml') {
      const density = safe(baseIngredient.density);
      baseTotalQuantityNeeded = baseQuantityPerJar * density * safe(numJars);
    }

    const baseIngredientCost = {
      ...baseIngredient,
      pricePerUnit: basePricePerUnit,
      costPerJar: baseCostPerJar,
      totalCostForBatch: baseTotalCostForBatch,
      totalQuantityNeeded: baseTotalQuantityNeeded,
      displayUnit: baseIngredient.unit,
      calculatedQuantity: calculatedBaseQuantityG
    };

    // Calculate additive ingredients costs
    const additiveIngredientCosts = additiveIngredients.map(ing => {
      const additiveQuantityPerBaseUnit = safe(ing.quantity);
      const additiveBulkPrice = safe(ing.bulkPrice);
      const additiveBulkUnit = ing.bulkUnit;
      
      // Convert bulk price to per-unit price
      let additivePricePerUnit;
      if (additiveBulkUnit === 'kg') {
        additivePricePerUnit = additiveBulkPrice / 1000; // Rs per gram
      } else if (additiveBulkUnit === 'L') {
        additivePricePerUnit = additiveBulkPrice / 1000; // Rs per ml
      } else {
        additivePricePerUnit = additiveBulkPrice;
      }
      
      // Calculate quantity per jar based on base ingredient
      // Convert base quantity to the same unit as base bulk unit for ratio calculation
      let baseQuantityInBulkUnit;
      if (baseBulkUnit === 'kg') {
        // Base quantity should be in grams, convert to kg
        baseQuantityInBulkUnit = baseQuantityPerJar / 1000;
      } else if (baseBulkUnit === 'L') {
        // Base quantity should be in ml, convert to L
        baseQuantityInBulkUnit = baseQuantityPerJar / 1000;
      } else {
        baseQuantityInBulkUnit = baseQuantityPerJar;
      }
      
      // Calculate additive quantity per jar
      const additiveQuantityPerJar = additiveQuantityPerBaseUnit * baseQuantityInBulkUnit;
      
      const additiveCostPerJar = additiveQuantityPerJar * additivePricePerUnit;
      const additiveTotalCostForBatch = additiveCostPerJar * safe(numJars);
      
      // Calculate total quantity needed for batch
      let additiveTotalQuantityNeeded = additiveQuantityPerJar * safe(numJars);
      
      // Convert ml to g for weight calculations if needed
      if (ing.unit === 'ml') {
        const density = safe(ing.density);
        const weightPerJar = additiveQuantityPerJar * density;
        additiveTotalQuantityNeeded = weightPerJar * safe(numJars);
      }

      return {
        ...ing,
        pricePerUnit: additivePricePerUnit,
        costPerJar: additiveCostPerJar,
        totalCostForBatch: additiveTotalCostForBatch,
        totalQuantityNeeded: additiveTotalQuantityNeeded,
        quantityPerJar: additiveQuantityPerJar,
        displayUnit: ing.unit
      };
    });

    // Combine all ingredient costs
    const ingredientCosts = [baseIngredientCost, ...additiveIngredientCosts];

    // Total material costs
    const totalMaterialCost = ingredientCosts.reduce((sum, ing) => sum + ing.totalCostForBatch, 0);
    const materialPerJar = ingredientCosts.reduce((sum, ing) => sum + ing.costPerJar, 0);

    // Packaging & transport
    const packagingPerJar = safe(boxCost) + safe(jarCost) + safe(stickerCost);
    const transportPerJar = safe(transportPer50g) * (safe(jarSizeG) / 50);

    // Per-jar & totals
    const totalCostPerJar = materialPerJar + packagingPerJar + transportPerJar + safe(otherOpPerJar);

    const profitPerJarMRP = safe(mrp) - totalCostPerJar;
    const profitPerJarDist = safe(distributorPrice) - totalCostPerJar;

    const marginMRP = safe(mrp) ? profitPerJarMRP / safe(mrp) : 0;
    const marginDist = safe(distributorPrice) ? profitPerJarDist / safe(distributorPrice) : 0;

    const totalPackaging = packagingPerJar * safe(numJars);
    const totalTransport = transportPerJar * safe(numJars);
    const totalOtherOp = safe(otherOpPerJar) * safe(numJars);
    const totalBatchCost = totalMaterialCost + totalPackaging + totalTransport + totalOtherOp;

    const totalRevenueMRP = safe(mrp) * safe(numJars);
    const totalRevenueDist = safe(distributorPrice) * safe(numJars);
    const totalProfitMRP = totalRevenueMRP - totalBatchCost;
    const totalProfitDist = totalRevenueDist - totalBatchCost;

    return {
      totalOutputG,
      calculatedBaseQuantity: calculatedBaseQuantityG,
      ingredientCosts,
      totalMaterialCost,
      packagingPerJar,
      transportPerJar,
      materialPerJar,
      totalCostPerJar,
      profitPerJarMRP,
      profitPerJarDist,
      marginMRP,
      marginDist,
      totalPackaging,
      totalTransport,
      totalOtherOp,
      totalBatchCost,
      totalRevenueMRP,
      totalRevenueDist,
      totalProfitMRP,
      totalProfitDist,
      hasBaseIngredient: true,
      baseIngredient,
    };
  }, [
    jarSizeG,
    numJars,
    ingredients,
    boxCost,
    jarCost,
    stickerCost,
    transportPer50g,
    otherOpPerJar,
    mrp,
    distributorPrice,
  ]);

  // Reset to defaults
  const resetToDefaults = () => {
    setJarSizeG(DEFAULTS.jarSizeG);
    setNumJars(DEFAULTS.numJars);
    setIngredients(DEFAULTS.ingredients);
    setBoxCost(DEFAULTS.boxCost);
    setJarCost(DEFAULTS.jarCost);
    setStickerCost(DEFAULTS.stickerCost);
    setTransportPer50g(DEFAULTS.transportPer50g);
    setOtherOpPerJar(DEFAULTS.otherOpPerJar);
    setMrp(DEFAULTS.mrp);
    setDistributorPrice(DEFAULTS.distributorPrice);
  };

  return (
    <section className="py-24 lg:py-40 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="w-24 h-24 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-12 border border-amber-400/20">
            <Calculator className="w-12 h-12 text-amber-400" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-white">
            Cream Production <span className="gold-text-24k">Calculator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Calculate your cream production costs with recipe-based formulation. Define your base material and additives in proportion. Currency: INR (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Inputs */}
          <section className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-amber-400" />
                Input Parameters
              </h2>
              <div className="space-y-6">
                <NumberField label="Jar Size (g)" value={jarSizeG} onChange={setJarSizeG} step={5} />
                <NumberField label="How many jars to make" value={numJars} onChange={setNumJars} step={10} />

                <Divider label="Recipe Formulation" />
                
                {/* Recipe Instructions */}
                <div className="bg-amber-400/10 p-6 rounded-2xl border border-amber-400/30">
                  <div className="flex items-center mb-4">
                    <Beaker className="w-6 h-6 text-amber-400 mr-3" />
                    <h4 className="text-amber-400 font-bold text-lg">How Recipe Works</h4>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <p><strong className="text-amber-400">Base Material:</strong> Set quantity per jar (e.g., 40g per jar)</p>
                    <p><strong className="text-amber-400">Additives:</strong> Set quantity per base unit (e.g., 250ml per 1kg base)</p>
                    <p><strong className="text-white">Example:</strong> If base is 40g per jar, and additive is 250ml per 1kg base, then additive per jar = (250ml ÷ 1000g) × 40g = 10ml per jar</p>
                  </div>
                </div>
                
                {/* Dynamic Ingredients */}
                <div className="space-y-6">
                  {ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className={`p-6 rounded-2xl border space-y-4 ${
                      ingredient.type === 'base' 
                        ? 'bg-amber-400/10 border-amber-400/50' 
                        : 'bg-gray-900 border-gray-700/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h4 className={`font-bold text-lg ${
                            ingredient.type === 'base' ? 'text-amber-400' : 'text-white'
                          }`}>
                            {ingredient.type === 'base' ? '🧪 Base Material' : `📦 Additive ${index}`}
                          </h4>
                          {ingredient.type === 'base' && (
                            <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                              BASE
                            </span>
                          )}
                        </div>
                        {ingredients.length > 1 && ingredient.type !== 'base' && (
                          <button
                            onClick={() => removeIngredient(ingredient.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-400/10 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors duration-300 font-medium"
                            placeholder="Ingredient name"
                          />
                        </div>

                        {/* Type Selection */}
                        <div>
                          <label className="block text-white font-medium mb-2">Type</label>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`type-${ingredient.id}`}
                                value="base"
                                checked={ingredient.type === 'base'}
                                onChange={(e) => updateIngredient(ingredient.id, 'type', e.target.value)}
                                className="mr-2 text-amber-400"
                              />
                              <span className="text-gray-300 text-sm">Base Material</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`type-${ingredient.id}`}
                                value="additive"
                                checked={ingredient.type === 'additive'}
                                onChange={(e) => updateIngredient(ingredient.id, 'type', e.target.value)}
                                className="mr-2 text-amber-400"
                              />
                              <span className="text-gray-300 text-sm">Additive</span>
                            </label>
                          </div>
                        </div>
                        
                        {/* Quantity Input/Display */}
                        <div>
                          {ingredient.type === 'base' ? (
                            <div>
                              <label className="block text-white font-medium mb-2">
                                Base quantity per jar (auto-calculated)
                              </label>
                              <div className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-amber-400 font-bold text-lg">
                                {data.calculatedBaseQuantity ? `${data.calculatedBaseQuantity.toFixed(2)} g` : 'Add additives to calculate'}
                              </div>
                              <p className="text-xs text-gray-400 mt-2">
                                Calculated based on jar size and additive proportions
                              </p>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-white font-medium mb-2">
                                Quantity per {data.baseIngredient?.bulkUnit || 'base unit'}
                              </label>
                              <input
                                type="number"
                                value={ingredient.quantity === 0 ? '' : ingredient.quantity}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  updateIngredient(ingredient.id, 'quantity', value === '' ? 0 : parseFloat(value) || 0);
                                }}
                                className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                                min="0"
                                step="0.1"
                                placeholder="Enter quantity"
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-white font-medium mb-2">Unit</label>
                            <select
                              value={ingredient.unit}
                              onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                              className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                            >
                              <option value="g">g</option>
                              <option value="ml">ml</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-white font-medium mb-2">Bulk Unit</label>
                            <select
                              value={ingredient.bulkUnit}
                              onChange={(e) => updateIngredient(ingredient.id, 'bulkUnit', e.target.value)}
                              className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                            >
                              <option value="kg">kg</option>
                              <option value="L">L</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-white font-medium mb-2">Bulk Price</label>
                            <input
                              type="number"
                              value={ingredient.bulkPrice === 0 ? '' : ingredient.bulkPrice}
                              onChange={(e) => {
                                const value = e.target.value;
                                updateIngredient(ingredient.id, 'bulkPrice', value === '' ? 0 : parseFloat(value) || 0);
                              }}
                              className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                              min="0"
                              step="0.01"
                              placeholder="Enter bulk price"
                            />
                          </div>
                          
                          {ingredient.unit === 'ml' && (
                            <div>
                              <label className="block text-white font-medium mb-2">Density (g/ml)</label>
                              <input
                                type="number"
                                value={ingredient.density === 1.0 ? '' : ingredient.density}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  updateIngredient(ingredient.id, 'density', value === '' ? 1.0 : parseFloat(value) || 1.0);
                                }}
                                className="w-full bg-black border border-gray-700 rounded-xl py-3 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                                min="0.1"
                                step="0.01"
                                placeholder="1.0"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Show calculated per-unit price and per-jar quantity */}
                        <div className="bg-black/50 p-4 rounded-xl border border-gray-700/30 space-y-2">
                          <div className="text-sm text-white font-medium">
                            Calculated Price: <span className="text-amber-400">
                              ₹{((ingredient.bulkUnit === 'kg' ? ingredient.bulkPrice / 1000 : ingredient.bulkPrice / 1000) || 0).toFixed(2)} per {ingredient.unit}
                            </span>
                          </div>
                          {ingredient.type === 'additive' && data.baseIngredient && data.calculatedBaseQuantity > 0 && (
                            <div className="text-sm text-white font-medium">
                              Per Jar: <span className="text-gray-300">
                                {(() => {
                                  const baseQuantityInBulkUnit = data.baseIngredient.bulkUnit === 'kg' 
                                    ? data.calculatedBaseQuantity / 1000 
                                    : data.calculatedBaseQuantity / 1000;
                                  const quantityPerJar = ingredient.quantity * baseQuantityInBulkUnit;
                                  return `${quantityPerJar.toFixed(2)} ${ingredient.unit}`;
                                })()}
                              </span>
                            </div>
                          )}
                          {ingredient.type === 'base' && (
                            <div className="text-sm text-white font-medium">
                              Cost per Jar: <span className="text-amber-400">
                                ₹{data.ingredientCosts.find(ing => ing.type === 'base')?.costPerJar.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addIngredient}
                    className="w-full bg-amber-400/20 hover:bg-amber-400/30 border-2 border-dashed border-amber-400/50 hover:border-amber-400 rounded-2xl py-4 px-6 text-amber-400 hover:text-amber-300 transition-all duration-300 flex items-center justify-center font-medium"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Additive Ingredient
                  </button>
                </div>

                <Divider label="Packaging & Operations" />
                <NumberField label="Box (outer) cost per jar (Rs)" value={boxCost} onChange={setBoxCost} />
                <NumberField label="Jar cost per piece (Rs)" value={jarCost} onChange={setJarCost} />
                <NumberField label="Sticker cost per jar (Rs)" value={stickerCost} onChange={setStickerCost} />
                <NumberField label="Transportation per 50g pack (Rs)" value={transportPer50g} onChange={setTransportPer50g} />
                <NumberField label="Other operation cost per jar (Rs)" value={otherOpPerJar} onChange={setOtherOpPerJar} />

                <Divider label="Selling Prices" />
                <NumberField label="MRP per jar (Rs)" value={mrp} onChange={setMrp} />
                <NumberField label="Distributor price per jar (Rs)" value={distributorPrice} onChange={setDistributorPrice} />

                <div className="pt-6 flex gap-3">
                  <button
                    className="px-6 py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white hover:text-amber-400 transition-all duration-300 border border-gray-700/50 hover:border-amber-400/30 font-medium"
                    onClick={resetToDefaults}
                  >
                    Reset to defaults
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Key Results */}
          <section className="lg:col-span-2 space-y-8">
            {!data.hasBaseIngredient && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 text-center">
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-400 mb-4">No Base Material Defined</h3>
                <p className="text-red-300">Please select one ingredient as your base material to see calculations.</p>
              </div>
            )}

            {data.hasBaseIngredient && (
              <>
                <Card title="Per-Jar Breakdown" icon={Package}>
                  {/* Dynamic ingredient costs */}
                  {data.ingredientCosts.map((ing) => (
                    <TwoColRow 
                      key={ing.id} 
                     label={`${ing.name} cost per jar ${ing.type === 'base' ? '(BASE)' : ''} (${fmtNum.format(ing.type === 'base' ? ing.calculatedQuantity : ing.quantityPerJar)}${ing.displayUnit})`} 
                      value={fmt.format(ing.costPerJar)} 
                      highlight={ing.type === 'base'}
                    />
                  ))}
                  <TwoColRow label="Box cost per jar" value={fmt.format(boxCost)} />
                  <TwoColRow label="Jar cost per jar" value={fmt.format(jarCost)} />
                  <TwoColRow label="Sticker cost per jar" value={fmt.format(stickerCost)} />
                  <TwoColRow label="Transport per jar" value={fmt.format(data.transportPerJar)} />
                  <TwoColRow label="Other operations per jar" value={fmt.format(otherOpPerJar)} />
                  <Divider />
                  <TwoColRow label="Total cost per jar" value={fmt.format(data.totalCostPerJar)} highlight />
                  <Divider />
                  <TwoColRow label="Profit per jar @ MRP" value={`${fmt.format(data.profitPerJarMRP)} (${fmtNum.format(data.marginMRP * 100)}%)`} positive={data.profitPerJarMRP >= 0} />
                  <TwoColRow label="Profit per jar @ Distributor" value={`${fmt.format(data.profitPerJarDist)} (${fmtNum.format(data.marginDist * 100)}%)`} positive={data.profitPerJarDist >= 0} />
                </Card>

                <Card title="Batch Totals" icon={DollarSign}>
                  <TwoColRow label="Total output (g)" value={`${fmtNum.format(data.totalOutputG)} g`} />
                  <TwoColRow label="Total material cost" value={fmt.format(data.totalMaterialCost)} />
                  <TwoColRow label="Total packaging cost" value={fmt.format(data.totalPackaging)} />
                  <TwoColRow label="Total transport cost" value={fmt.format(data.totalTransport)} />
                  <TwoColRow label="Total other ops" value={fmt.format(data.totalOtherOp)} />
                  <Divider />
                  <TwoColRow label="Total batch cost" value={fmt.format(data.totalBatchCost)} highlight />
                  <Divider />
                  <TwoColRow label="Total revenue @ MRP" value={fmt.format(data.totalRevenueMRP)} />
                  <TwoColRow label="Total profit @ MRP" value={fmt.format(data.totalProfitMRP)} positive={data.totalProfitMRP >= 0} />
                  <TwoColRow label="Total revenue @ Distributor" value={fmt.format(data.totalRevenueDist)} />
                  <TwoColRow label="Total profit @ Distributor" value={fmt.format(data.totalProfitDist)} positive={data.totalProfitDist >= 0} />
                </Card>

                <Card title="Materials Required (for this batch)" icon={Package}>
                  {data.ingredientCosts.map((ing) => (
                    <TwoColRow 
                      key={ing.id} 
                      label={`${ing.name} required ${ing.type === 'base' ? '(BASE)' : ''}`} 
                      value={`${fmtNum.format(ing.totalQuantityNeeded)} ${ing.unit}`}
                      highlight={ing.type === 'base'}
                    />
                  ))}
                  <SmallNote>
                    Quantities calculated based on your recipe formulation × {numJars} jars. Additives are calculated proportionally to the base material.
                  </SmallNote>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-amber-400/20 to-yellow-600/20 p-8 rounded-3xl border border-amber-400/30">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-amber-400 mb-2">{numJars}</div>
                      <div className="text-white font-medium">Jars to Produce</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-400/20 to-gray-600/20 p-8 rounded-3xl border border-gray-400/30">
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-gray-400 mb-2">
                        {fmt.format(data.totalCostPerJar)}
                      </div>
                      <div className="text-gray-300 font-medium">Cost per Jar</div>
                    </div>
                  </div>
                  
                  <div className={`bg-gradient-to-br p-8 rounded-3xl border ${
                    data.profitPerJarMRP >= 0 
                      ? 'from-green-400/20 to-green-600/20 border-green-400/30' 
                      : 'from-red-400/20 to-red-600/20 border-red-400/30'
                  }`}>
                    <div className="text-center">
                      {data.profitPerJarMRP >= 0 ? (
                        <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      ) : (
                        <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      )}
                      <div className={`text-3xl font-bold mb-2 ${
                        data.profitPerJarMRP >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {fmtNum.format(data.marginMRP * 100)}%
                      </div>
                      <div className="text-gray-300 font-medium">MRP Margin</div>
                    </div>
                  </div>
                </div>

                <Card title="Recipe Formulation Guide" icon={Beaker}>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                    <li><strong className="text-amber-400">Base Material:</strong> The primary ingredient quantity is auto-calculated based on jar size and additive proportions.</li>
                    <li><strong className="text-white">Additives:</strong> Define secondary ingredients relative to your base unit (e.g., 250ml saffron oil per 1kg base).</li>
                    <li><strong className="text-white">Smart Calculation:</strong> System calculates optimal base quantity to accommodate all additives within jar size.</li>
                    <li><strong className="text-white">Bulk Pricing:</strong> Enter prices as you purchase them (per kg or per L) for accurate costing.</li>
                    <li><strong className="text-white">Recipe Balance:</strong> Base quantity adjusts automatically to maintain proper ratios with additives.</li>
                  </ul>
                </Card>
              </>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

// ---------- UI Subcomponents ----------
function Card({ title, children, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        {Icon && <Icon className="w-6 h-6 mr-3 text-amber-400" />}
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TwoColRow({ label, value, highlight = false, positive }) {
  return (
    <div className={`py-3 flex items-center justify-between ${highlight ? "font-bold" : ""}`}>
      <span className="text-gray-300">{label}</span>
      <span className={`tabular-nums font-medium ${
        highlight 
          ? "text-amber-400 text-lg" 
          : positive === true 
            ? "text-green-400" 
            : positive === false 
              ? "text-red-400" 
              : "text-white"
      }`}>
        {value}
      </span>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="my-6">
      {label ? (
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-700/50 flex-1" />
          <span className="text-sm text-amber-400 whitespace-nowrap font-medium">{label}</span>
          <div className="h-px bg-gray-700/50 flex-1" />
        </div>
      ) : (
        <div className="h-px bg-gray-700/50" />
      )}
    </div>
  );
}

function NumberField({ label, value, onChange, step = 1 }) {
  const [inputValue, setInputValue] = useState('');

  // Sync inputValue with value prop
  useEffect(() => {
    if (value === 0) {
      setInputValue('');
    } else {
      setInputValue(value.toString());
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue === '') {
      onChange(0);
    } else {
      const numValue = parseFloat(newValue);
      onChange(Number.isFinite(numValue) ? numValue : 0);
    }
  };

  return (
    <label className="block">
      <span className="text-white font-medium mb-3 block">{label}</span>
      <input
        type="number"
        className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-4 px-6 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-lg font-medium"
        value={inputValue}
        step={step}
        min={0}
        onChange={handleChange}
      />
    </label>
  );
}

function SmallNote({ children }) {
  return <p className="text-sm text-gray-300 pt-4 leading-relaxed">{children}</p>;
}

// ---------- Helpers ----------
function safe(n) {
  const v = parseFloat(String(n));
  if (Number.isFinite(v)) return v;
  return 0;
}