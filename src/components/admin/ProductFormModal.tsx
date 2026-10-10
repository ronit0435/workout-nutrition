import React, { useState, useEffect } from 'react';
import { Product, CategoryType, GoalType } from '../../types';
import { productsService } from '../../lib/products.service';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: () => void;
}

const CATEGORIES: CategoryType[] = [
  'Whey Protein',
  'Whey Isolate',
  'Creatine',
  'Pre Workout',
  'Mass Gainer',
  'BCAA & EAA',
  'Multivitamins',
  'Fish Oil',
  'Fat Burner',
  'Health & Wellness',
  'Glutamine & Aminos',
  'Carbohydrates & Recovery',
];

const ALL_GOALS: { id: GoalType; label: string }[] = [
  { id: 'build-muscle', label: 'Build Muscle' },
  { id: 'gain-weight', label: 'Gain Weight' },
  { id: 'lose-fat', label: 'Lose Fat' },
  { id: 'increase-strength', label: 'Increase Strength' },
  { id: 'boost-energy', label: 'Boost Energy' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'health-wellness', label: 'Health & Wellness' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'variants' | 'nutrition' | 'media'>('basic');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<CategoryType>('Whey Protein');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState<number>(1999);
  const [originalPrice, setOriginalPrice] = useState<number>(2999);
  const [stock, setStock] = useState<number>(50);
  const [servings, setServings] = useState<number>(30);
  const [dietary, setDietary] = useState<'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Gluten-Free'>('Vegetarian');
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Lists & Arrays
  const [flavours, setFlavours] = useState<string[]>(['Chocolate']);
  const [newFlavour, setNewFlavour] = useState('');
  const [sizes, setSizes] = useState<string[]>(['1 kg (2.2 lbs)']);
  const [newSize, setNewSize] = useState('');
  const [images, setImages] = useState<string[]>(['/products/on-gold-standard.jpg']);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(['build-muscle']);
  const [benefits, setBenefits] = useState<string[]>(['High biological value protein']);
  const [newBenefit, setNewBenefit] = useState('');
  const [nutritionFacts, setNutritionFacts] = useState<{ nutrient: string; amountPerServing: string }[]>([
    { nutrient: 'Total Protein', amountPerServing: '24 g' },
    { nutrient: 'Calories', amountPerServing: '120 kcal' },
  ]);

  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [howToUse, setHowToUse] = useState('');

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setId(productToEdit.id);
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setSubcategory(productToEdit.subcategory || '');
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice);
      setStock(productToEdit.stock);
      setServings(productToEdit.servings);
      setDietary(productToEdit.dietary);
      setIsBestSeller(Boolean(productToEdit.isBestSeller));
      setIsFeatured(Boolean(productToEdit.isFeatured));
      setIsNew(Boolean(productToEdit.isNew));
      setFlavours(productToEdit.flavours || []);
      setSizes(productToEdit.sizes || []);
      setImages(productToEdit.images || []);
      setSelectedGoals(productToEdit.goals || []);
      setBenefits(productToEdit.benefits || []);
      setNutritionFacts(productToEdit.nutritionFacts || []);
      setDescription(productToEdit.description || '');
      setIngredients(productToEdit.ingredients || '');
      setHowToUse(productToEdit.howToUse || '');
    } else {
      // Reset form
      const genId = 'prod-' + Math.random().toString(36).substring(2, 8);
      setId(genId);
      setName('');
      setBrand('');
      setCategory('Whey Protein');
      setSubcategory('Blended Whey');
      setPrice(1999);
      setOriginalPrice(2999);
      setStock(50);
      setServings(30);
      setDietary('Vegetarian');
      setIsBestSeller(false);
      setIsFeatured(false);
      setIsNew(false);
      setFlavours(['Chocolate', 'Vanilla']);
      setSizes(['1 kg (2.2 lbs)', '2 kg (4.4 lbs)']);
      setImages(['/products/on-gold-standard.jpg']);
      setSelectedGoals(['build-muscle', 'recovery']);
      setBenefits(['Supports lean muscle growth', 'Rapid post-workout recovery']);
      setNutritionFacts([
        { nutrient: 'Total Protein', amountPerServing: '24 g' },
        { nutrient: 'Calories', amountPerServing: '120 kcal' },
      ]);
      setDescription('');
      setIngredients('');
      setHowToUse('Mix 1 scoop with 200ml cold water or milk.');
    }
    setErrorMsg(null);
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : id;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { url, error } = await productsService.uploadImage(file);
    setUploadingImage(false);

    if (error) {
      alert(`Upload note: ${error.message}. You can also enter an image URL directly.`);
    } else if (url) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brand.trim()) {
      setErrorMsg('Name and Brand are required');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const productPayload: Product = {
      id: id || slug,
      slug,
      name: name.trim(),
      brand: brand.trim(),
      category,
      subcategory: subcategory.trim() || category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discount,
      rating: productToEdit?.rating ?? 4.8,
      reviewCount: productToEdit?.reviewCount ?? 120,
      stock: Number(stock),
      servings: Number(servings),
      dietary,
      isBestSeller,
      isFeatured,
      isNew,
      flavours,
      sizes,
      images: images.length > 0 ? images : ['/products/on-gold-standard.jpg'],
      goals: selectedGoals,
      benefits,
      nutritionFacts,
      description: description.trim(),
      ingredients: ingredients.trim(),
      howToUse: howToUse.trim(),
      tags: [category.toLowerCase(), brand.toLowerCase(), ...selectedGoals],
      whoIsItFor: ['Athletes and fitness enthusiasts'],
      whenToUse: howToUse || 'Post-workout or daily as needed',
    };

    try {
      if (productToEdit) {
        const { error } = await productsService.updateProduct(productToEdit.id, productPayload);
        if (error) throw error;
      } else {
        const { error } = await productsService.createProduct(productPayload);
        if (error) throw error;
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save product in database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-zinc-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 font-mono">
              Admin Inventory
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 font-display">
              {productToEdit ? `Edit: ${productToEdit.name}` : 'Add New Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 px-6 bg-white overflow-x-auto">
          {[
            { id: 'basic', label: 'Basic Info & Pricing' },
            { id: 'variants', label: 'Variants & Highlights' },
            { id: 'nutrition', label: 'Nutrition & Details' },
            { id: 'media', label: 'Images & Media' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gold Standard 100% Whey"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Optimum Nutrition"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Blended Whey"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Original MRP (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Discount
                  </label>
                  <div className="px-3.5 py-2.5 text-sm bg-zinc-100 rounded-xl font-bold text-red-600">
                    {discount}% OFF
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Units in Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Dietary Type
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  >
                    <option value="Vegetarian">Vegetarian (Green mark)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian (Red mark)</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Servings Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Badges / Toggles */}
              <div className="flex flex-wrap gap-4 pt-3 border-t border-zinc-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Featured on Home Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>New Arrival</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: VARIANTS & HIGHLIGHTS */}
          {activeTab === 'variants' && (
            <div className="space-y-6">
              {/* Flavours */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Available Flavours
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {flavours.map((flavour, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-medium text-zinc-800"
                    >
                      {flavour}
                      <button
                        type="button"
                        onClick={() => setFlavours(flavours.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFlavour}
                    onChange={(e) => setNewFlavour(e.target.value)}
                    placeholder="e.g. Vanilla Ice Cream"
                    className="flex-1 px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFlavour.trim()) {
                        setFlavours([...flavours, newFlavour.trim()]);
                        setNewFlavour('');
                      }
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800"
                  >
                    Add Flavour
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Available Sizes / Weights
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {sizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-medium text-zinc-800"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="e.g. 5 lbs (2.27 kg)"
                    className="flex-1 px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSize.trim()) {
                        setSizes([...sizes, newSize.trim()]);
                        setNewSize('');
                      }
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800"
                  >
                    Add Size
                  </button>
                </div>
              </div>

              {/* Fitness Goals */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Supported Fitness Goals
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_GOALS.map((goal) => {
                    const selected = selectedGoals.includes(goal.id);
                    return (
                      <button
                        type="button"
                        key={goal.id}
                        onClick={() => {
                          if (selected) {
                            setSelectedGoals(selectedGoals.filter((g) => g !== goal.id));
                          } else {
                            setSelectedGoals([...selectedGoals, goal.id]);
                          }
                        }}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-left transition-all ${
                          selected
                            ? 'bg-red-50 border-red-500 text-red-600'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '} {goal.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Key Benefits Bullet Points
                </label>
                <div className="space-y-2 mb-3">
                  {benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-800 bg-zinc-50 p-2 rounded-xl border border-zinc-200">
                      <span className="flex-1">{b}</span>
                      <button
                        type="button"
                        onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))}
                        className="text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="e.g. 24g pure whey isolate per scoop"
                    className="flex-1 px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newBenefit.trim()) {
                        setBenefits([...benefits, newBenefit.trim()]);
                        setNewBenefit('');
                      }
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800"
                  >
                    Add Benefit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION & DETAILS */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              {/* Nutrition Facts Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Nutrition Facts (Per Serving)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setNutritionFacts([...nutritionFacts, { nutrient: 'Nutrient', amountPerServing: '0 g' }])
                    }
                    className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                <div className="space-y-2">
                  {nutritionFacts.map((fact, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={fact.nutrient}
                        onChange={(e) => {
                          const updated = [...nutritionFacts];
                          updated[idx].nutrient = e.target.value;
                          setNutritionFacts(updated);
                        }}
                        placeholder="Nutrient (e.g. Protein)"
                        className="flex-1 px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
                      />
                      <input
                        type="text"
                        value={fact.amountPerServing}
                        onChange={(e) => {
                          const updated = [...nutritionFacts];
                          updated[idx].amountPerServing = e.target.value;
                          setNutritionFacts(updated);
                        }}
                        placeholder="Amount (e.g. 24 g)"
                        className="w-32 px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setNutritionFacts(nutritionFacts.filter((_, i) => i !== idx))}
                        className="p-2 text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed clinical formulation and product summary..."
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              {/* Ingredients & How to use */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Ingredients List
                  </label>
                  <textarea
                    rows={3}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Whey protein isolate, cocoa, lecithin, stevia..."
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    How To Use Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={howToUse}
                    onChange={(e) => setHowToUse(e.target.value)}
                    placeholder="Mix 1 rounded scoop with 200ml cold water..."
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & IMAGES */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Product Images
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden border border-zinc-200 aspect-square bg-zinc-100 flex items-center justify-center">
                      <img src={img} alt="" className="w-full h-full object-contain p-2" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g. /products/on-gold-standard.jpg)"
                    className="flex-1 px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-red-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newImageUrl.trim()) {
                        setImages([...images, newImageUrl.trim()]);
                        setNewImageUrl('');
                      }
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800"
                  >
                    Add URL
                  </button>
                </div>

                {/* Direct Upload to Supabase Storage */}
                <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center bg-zinc-50 hover:bg-zinc-100/60 transition-colors">
                  <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-zinc-700 uppercase tracking-wide">
                    {uploadingImage ? 'Uploading Image to Supabase...' : 'Upload Image File'}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1 mb-3">PNG, JPG, WEBP up to 5MB</p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-300 rounded-xl text-xs font-bold text-zinc-700 hover:border-red-600 hover:text-red-600 cursor-pointer shadow-sm">
                    <span>Browse Files</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/25 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{productToEdit ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
