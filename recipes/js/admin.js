const STORAGE_KEY = "recipes_app_data";
const FAVORITE_KEY = "recipes_favorites";

let appData = loadAppData();

const recipeForm = document.getElementById("recipeForm");
const recipeId = document.getElementById("recipeId");

const nameInput = document.getElementById("name");
const imageInput = document.getElementById("image");
const categoryInput = document.getElementById("category");
const tasteInput = document.getElementById("taste");
const ingredientsInput = document.getElementById("ingredients");
const timeInput = document.getElementById("time");
const difficultyInput = document.getElementById("difficulty");
const servingsInput = document.getElementById("servings");
const stepsInput = document.getElementById("steps");
const tipsInput = document.getElementById("tips");

const recipeTable = document.getElementById("recipeTable");

const categoryList = document.getElementById("categoryList");
const tasteList = document.getElementById("tasteList");
const ingredientList = document.getElementById("ingredientList");

const newCategory = document.getElementById("newCategory");
const newTaste = document.getElementById("newTaste");
const newIngredient = document.getElementById("newIngredient");

const addCategoryBtn = document.getElementById("addCategoryBtn");
const addTasteBtn = document.getElementById("addTasteBtn");
const addIngredientManageBtn = document.getElementById("addIngredientManageBtn");

const clearFormBtn = document.getElementById("clearFormBtn");
const saveDataJsBtn = document.getElementById("saveDataJsBtn");
const exportBtn = document.getElementById("exportBtn");
const resetDataBtn = document.getElementById("resetDataBtn");

/**
 * 读取本地数据
 */
function loadAppData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      return {
        recipes: Array.isArray(parsed.recipes) ? parsed.recipes : DEFAULT_RECIPES,
        categories: Array.isArray(parsed.categories) ? parsed.categories : DEFAULT_CATEGORIES,
        tastes: Array.isArray(parsed.tastes) ? parsed.tastes : DEFAULT_TASTES,
        ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : DEFAULT_INGREDIENTS
      };
    } catch (error) {
      console.warn("本地数据解析失败，使用默认数据。", error);
    }
  }

  const initialData = {
    recipes: DEFAULT_RECIPES,
    categories: DEFAULT_CATEGORIES,
    tastes: DEFAULT_TASTES,
    ingredients: DEFAULT_INGREDIENTS
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}

/**
 * 保存到浏览器本地
 */
function saveAppData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

/**
 * 删除食谱后，同时清理收藏中的旧 ID
 */
function removeDeletedRecipeFromFavorites(id) {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
    const newFavorites = favorites.filter(item => item !== id);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites));
  } catch (error) {
    console.warn("收藏数据清理失败。", error);
  }
}

/**
 * 把输入框中的文本转换为数组
 * 支持英文逗号、中文逗号、顿号、换行
 */
function splitText(value) {
  return value
    .split(/[,，、\n]+/)
    .map(item => item.trim())
    .filter(Boolean);
}

/**
 * 生成唯一 ID
 */
function createId() {
  return "r" + Date.now();
}

/**
 * 清空表单
 */
function clearForm() {
  recipeForm.reset();
  recipeId.value = "";
}

/**
 * 避免重复添加
 */
function addUnique(array, value) {
  if (value && !array.includes(value)) {
    array.push(value);
  }
}

/**
 * 保存菜谱后，自动把菜谱里的分类、口味、食材同步到管理列表
 */
function syncOptionsFromRecipe(recipe) {
  recipe.category.forEach(item => addUnique(appData.categories, item));
  recipe.taste.forEach(item => addUnique(appData.tastes, item));
  recipe.ingredients.forEach(item => addUnique(appData.ingredients, item));
}

/**
 * 添加 / 编辑食谱
 */
function handleSubmit(event) {
  event.preventDefault();

  const recipe = {
    id: recipeId.value || createId(),
    name: nameInput.value.trim(),
    image: imageInput.value.trim(),
    category: splitText(categoryInput.value),
    taste: splitText(tasteInput.value),
    ingredients: splitText(ingredientsInput.value),
    time: timeInput.value.trim() || "未知时间",
    difficulty: difficultyInput.value.trim() || "简单",
    servings: servingsInput.value.trim() || "1-2人",
    steps: stepsInput.value
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean),
    tips: tipsInput.value.trim() || "暂无小贴士。"
  };

  if (!recipe.name) {
    alert("请填写菜谱名称。");
    return;
  }

  if (!recipe.image) {
    alert("请填写图片路径，例如：./images/hongshaorou.webp");
    return;
  }

  if (recipe.category.length === 0) {
    alert("请至少填写一个分类。");
    return;
  }

  if (recipe.taste.length === 0) {
    alert("请至少填写一个口味。");
    return;
  }

  if (recipe.ingredients.length === 0) {
    alert("请至少填写一个食材。");
    return;
  }

  if (recipe.steps.length === 0) {
    alert("请至少填写一个制作步骤。");
    return;
  }

  const index = appData.recipes.findIndex(item => item.id === recipe.id);

  if (index >= 0) {
    appData.recipes[index] = recipe;
  } else {
    appData.recipes.push(recipe);
  }

  syncOptionsFromRecipe(recipe);
  saveAppData();
  clearForm();
  renderAll();

  alert("食谱已保存。记得点击顶部的「保存到 data.js」，这样发布后才会更新。");
}

/**
 * 编辑食谱
 */
function editRecipe(id) {
  const recipe = appData.recipes.find(item => item.id === id);
  if (!recipe) return;

  recipeId.value = recipe.id;
  nameInput.value = recipe.name;
  imageInput.value = recipe.image;
  categoryInput.value = recipe.category.join(",");
  tasteInput.value = recipe.taste.join(",");
  ingredientsInput.value = recipe.ingredients.join(",");
  timeInput.value = recipe.time || "";
  difficultyInput.value = recipe.difficulty || "";
  servingsInput.value = recipe.servings || "";
  stepsInput.value = recipe.steps.join("\n");
  tipsInput.value = recipe.tips || "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/**
 * 删除食谱
 */
function deleteRecipe(id) {
  const targetRecipe = appData.recipes.find(item => item.id === id);

  if (!targetRecipe) {
    alert("没有找到这个菜谱，可能已经被删除。");
    renderAll();
    return;
  }

  const confirmed = confirm(`确定删除「${targetRecipe.name}」这个菜谱吗？`);

  if (!confirmed) return;

  appData.recipes = appData.recipes.filter(item => item.id !== id);

  if (recipeId.value === id) {
    clearForm();
  }

  removeDeletedRecipeFromFavorites(id);
  saveAppData();
  renderAll();

  alert("已删除。首页会自动重新读取数据。如果是发布到线上，记得点击顶部的「保存到 data.js」。");
}

/**
 * 渲染食谱列表
 */
function renderRecipeTable() {
  if (appData.recipes.length === 0) {
    recipeTable.innerHTML = `<div class="admin-empty">暂无食谱</div>`;
    return;
  }

  recipeTable.innerHTML = appData.recipes.map(recipe => `
    <div class="admin-row">
      <div class="admin-recipe-info">
        <img 
          src="${recipe.image}" 
          alt="${recipe.name}" 
          onerror="this.style.display='none'" 
        />

        <div>
          <strong>${recipe.name}</strong>
          <p>${recipe.category.join(" / ")} · ${recipe.taste.join(" / ")}</p>
          <span>${recipe.ingredients.join("、")}</span>
        </div>
      </div>

      <div class="admin-row-actions">
        <button type="button" onclick="editRecipe('${recipe.id}')">编辑</button>
        <button type="button" class="danger" onclick="deleteRecipe('${recipe.id}')">删除</button>
      </div>
    </div>
  `).join("");
}

/**
 * 渲染分类 / 口味 / 食材标签
 */
function renderManagerList(container, items, type) {
  container.innerHTML = items.map(item => `
    <button class="manager-tag" type="button">
      ${item}
      <span onclick="removeManagerItem('${type}', '${item}')">×</span>
    </button>
  `).join("");
}

/**
 * 删除分类 / 口味 / 食材
 */
function removeManagerItem(type, value) {
  const confirmed = confirm(`确定删除「${value}」吗？`);

  if (!confirmed) return;

  if (type === "category") {
    appData.categories = appData.categories.filter(item => item !== value);
  }

  if (type === "taste") {
    appData.tastes = appData.tastes.filter(item => item !== value);
  }

  if (type === "ingredient") {
    appData.ingredients = appData.ingredients.filter(item => item !== value);
  }

  saveAppData();
  renderAll();

  alert("已删除。记得点击顶部的「保存到 data.js」，这样发布后才会更新。");
}

/**
 * 添加分类 / 口味 / 食材
 */
function addManagerItem(type, input) {
  const value = input.value.trim();

  if (!value) return;

  if (type === "category") {
    addUnique(appData.categories, value);
  }

  if (type === "taste") {
    addUnique(appData.tastes, value);
  }

  if (type === "ingredient") {
    addUnique(appData.ingredients, value);
  }

  input.value = "";
  saveAppData();
  renderAll();

  alert("已添加。记得点击顶部的「保存到 data.js」，这样发布后才会更新。");
}

/**
 * 生成 data.js 文件内容
 * 这个内容可以直接覆盖 source/recipes/js/data.js
 */
function generateDataJsContent() {
  return `const DEFAULT_RECIPES = ${JSON.stringify(appData.recipes, null, 2)};

const DEFAULT_CATEGORIES = ${JSON.stringify(appData.categories, null, 2)};

const DEFAULT_TASTES = ${JSON.stringify(appData.tastes, null, 2)};

const DEFAULT_INGREDIENTS = ${JSON.stringify(appData.ingredients, null, 2)};
`;
}

/**
 * 直接保存到 data.js
 * 需要 Chrome / Edge 支持
 */
async function saveToDataJs() {
  const content = generateDataJsContent();

  if (!window.showSaveFilePicker) {
    alert("当前浏览器不支持直接写入文件，请使用 Chrome 或 Edge。系统将改为下载 data.js 文件。");
    exportData();
    return;
  }

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "data.js",
      types: [
        {
          description: "JavaScript 文件",
          accept: {
            "text/javascript": [".js"],
            "application/javascript": [".js"]
          }
        }
      ]
    });

    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();

    alert("已成功保存到 data.js。现在可以执行 hexo clean && hexo g && hexo d 发布。");
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
      alert("保存失败，请确认你选择的是 source/recipes/js/data.js。");
    }
  }
}

/**
 * 备用下载 data.js
 */
function exportData() {
  const data = generateDataJsContent();
  const blob = new Blob([data], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.js";
  link.click();

  URL.revokeObjectURL(url);

  alert("已下载 data.js。你可以用它替换 source/recipes/js/data.js。");
}

/**
 * 恢复默认数据
 */
function resetData() {
  const confirmed = confirm("确定恢复默认数据吗？当前本地添加的数据会被清空。");

  if (!confirmed) return;

  appData = {
    recipes: DEFAULT_RECIPES,
    categories: DEFAULT_CATEGORIES,
    tastes: DEFAULT_TASTES,
    ingredients: DEFAULT_INGREDIENTS
  };

  saveAppData();
  clearForm();
  renderAll();

  alert("已恢复默认数据。记得点击顶部的「保存到 data.js」，这样发布后才会生效。");
}

/**
 * 页面整体刷新
 */
function renderAll() {
  renderRecipeTable();
  renderManagerList(categoryList, appData.categories, "category");
  renderManagerList(tasteList, appData.tastes, "taste");
  renderManagerList(ingredientList, appData.ingredients, "ingredient");
}

/**
 * 事件绑定
 */
recipeForm.addEventListener("submit", handleSubmit);
clearFormBtn.addEventListener("click", clearForm);

addCategoryBtn.addEventListener("click", () => addManagerItem("category", newCategory));
addTasteBtn.addEventListener("click", () => addManagerItem("taste", newTaste));
addIngredientManageBtn.addEventListener("click", () => addManagerItem("ingredient", newIngredient));

if (saveDataJsBtn) {
  saveDataJsBtn.addEventListener("click", saveToDataJs);
}

exportBtn.addEventListener("click", exportData);
resetDataBtn.addEventListener("click", resetData);

/**
 * 允许回车添加分类 / 口味 / 食材
 */
newCategory.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addManagerItem("category", newCategory);
  }
});

newTaste.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addManagerItem("taste", newTaste);
  }
});

newIngredient.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addManagerItem("ingredient", newIngredient);
  }
});


// ============================================================
// ?????????? ? ??? images/ ? ?????
// ============================================================
const imageUpload = document.getElementById("imageUpload");
const imageUploadBtn = document.getElementById("imageUploadBtn");


// 拖拽图片到预览区
window.handleImageDrop = function handleImageDrop(event) {
  event.preventDefault();
  const preview = document.getElementById("imagePreview");
  preview.style.outline = "";

  const file = event.dataTransfer.files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("请拖入图片文件（支持 JPG, PNG, GIF, WebP, SVG, AVIF 等格式）");
    return;
  }

  // 模拟文件选择
  const dt = new DataTransfer();
  dt.items.add(file);
  imageUpload.files = dt.files;

  // 触发 change 事件
  imageUpload.dispatchEvent(new Event("change", { bubbles: true }));

  // 高亮拖拽区
  preview.style.outline = "2px dashed rgba(98, 231, 255, 0.6)";
  setTimeout(() => { preview.style.outline = ""; }, 1200);
}

imageUploadBtn.addEventListener("click", () => {
  imageUpload.click();
});

imageUpload.addEventListener("change", async () => {
  const file = imageUpload.files[0];
  if (!file) return;

  // Show preview immediately from the selected file
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreviewImg.src = e.target.result;
    imagePreviewImg.style.display = "block";
    imagePreviewHint.style.display = "none";
  };
  reader.readAsDataURL(file);

  // Try to copy the file to the images/ folder
  const targetPath = "./images/" + file.name;

  try {
    // Attempt File System Access API (Chrome/Edge)
    if (window.showDirectoryPicker) {
      // Try to get images folder handle
      let dirHandle;
      try {
        dirHandle = await window.showDirectoryPicker({
          mode: "readwrite",
          startIn: "desktop"
        });
      } catch (e) {
        // User canceled or API not available for targeted folder
        throw e;
      }

      // Navigate to images folder if possible, or create it
      try { dirHandle = await dirHandle.getDirectoryHandle("images", { create: true }); } catch (e) {}

      const fileHandle = await dirHandle.getFileHandle(file.name, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(file);
      await writable.close();

      imageInput.value = targetPath;
      imagePreviewHint.style.display = "none";
      console.log("Image saved to images/ folder:", file.name);
    } else {
      throw new Error("File System Access API not supported");
    }
  } catch (e) {
    // Fallback: just set the path and tell user to copy manually
    imageInput.value = targetPath;
    imagePreviewHint.style.display = "block";
    imagePreviewHint.textContent =
      "? ?????????? " + file.name + " ??? images/ ???";
    console.warn("Cannot auto-save to images/ folder. User needs to copy manually.", e.message || e);
  }

  // Reset file input so same file can be re-selected
  imageUpload.value = "";
});

// ============================================================
// ????? images/ ???
// ============================================================
function checkMissingImages() {
  const imagePaths = [...new Set(appData.recipes.map((r) => r.image).filter(Boolean))];
  if (imagePaths.length === 0) return [];

  // We cannot truly check filesystem from browser JS.
  // Instead, list all unique paths and let the user verify.
  return imagePaths;
}

// Override saveToDataJs to include image checklist
const _origSaveToDataJs = saveToDataJs;
saveToDataJs = async function () {
  const missing = checkMissingImages();
  if (missing.length > 0) {
    const msg =
      "???????????? images/ ?????\n\n" +
      missing.map((p) => "  ? " + p.replace("./images/", "")).join("\n") +
      "\n\n??????? images/ ????????\n\n???????? data.js";
    if (!confirm(msg)) return;
  }
  return _origSaveToDataJs();
};

// Override exportData similarly
const _origExportData = exportData;
exportData = function () {
  const missing = checkMissingImages();
  if (missing.length > 0) {
    const msg =
      "???????????? images/ ?????\n\n" +
      missing.map((p) => "  ? " + p.replace("./images/", "")).join("\n") +
      "\n\n??????? images/ ????????\n\n????????";
    if (!confirm(msg)) return;
  }
  return _origExportData();
};


// ??????
const imagePreviewImg = document.getElementById("imagePreviewImg");
const imagePreviewHint = document.getElementById("imagePreviewHint");

imageInput.addEventListener("input", () => {
  const path = imageInput.value.trim();
  if (!path) {
    imagePreviewImg.style.display = "none";
    imagePreviewHint.style.display = "block";
    imagePreviewHint.textContent = "?????????";
    return;
  }

  // Check common image formats
  const ext = path.split(".").pop().toLowerCase();
  const supportedFormats = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif", "tiff", "ico"];
  if (!supportedFormats.includes(ext)) {
    imagePreviewImg.style.display = "none";
    imagePreviewHint.style.display = "block";
    imagePreviewHint.textContent = "??: " + ext.toUpperCase() + " (?? JPG/PNG/GIF/WebP/SVG/AVIF)";
    return;
  }

  imagePreviewImg.src = path;
  imagePreviewImg.style.display = "block";
  imagePreviewHint.style.display = "none";
});

imagePreviewImg.addEventListener("error", () => {
  imagePreviewImg.style.display = "none";
  imagePreviewHint.style.display = "block";
  imagePreviewHint.textContent = "? ????????????????";
});

imagePreviewImg.addEventListener("load", () => {
  imagePreviewImg.style.display = "block";
  imagePreviewHint.style.display = "none";
});


renderAll();