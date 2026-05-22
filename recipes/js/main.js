const STORAGE_KEY = "recipes_app_data";
const FAVORITE_KEY = "recipes_favorites";

let appData = loadAppData();
let currentPage = "discover";
let selectedCategories = [];
let selectedTastes = [];
let selectedIngredients = [];
let currentDetailId = null;

const recipeGrid = document.getElementById("recipeGrid");
const ingredientInput = document.getElementById("ingredientInput");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const selectedTags = document.getElementById("selectedTags");
const globalSearch = document.getElementById("globalSearch");
const emptyState = document.getElementById("emptyState");
const categoryFilters = document.getElementById("categoryFilters");
const tasteFilters = document.getElementById("tasteFilters");
const ingredientFilters = document.getElementById("ingredientFilters");
const resetBtn = document.getElementById("resetBtn");
const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");

const detailModal = document.getElementById("detailModal");
const detailMask = document.getElementById("detailMask");
const detailClose = document.getElementById("detailClose");
const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailMeta = document.getElementById("detailMeta");
const detailIngredients = document.getElementById("detailIngredients");
const detailSteps = document.getElementById("detailSteps");
const detailTips = document.getElementById("detailTips");
const favoriteBtn = document.getElementById("favoriteBtn");

const fallbackImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80"
];

/**
 * 读取本地数据
 * 优先读取 localStorage；如果没有本地数据，才使用 data.js 里的默认数据
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
 * 重新读取后台保存的数据
 * 解决：后台删除后，首页已打开但没有自动更新的问题
 */
function refreshAppData() {
  appData = loadAppData();

  selectedCategories = selectedCategories.filter(item => appData.categories.includes(item));
  selectedTastes = selectedTastes.filter(item => appData.tastes.includes(item));

  const currentRecipeStillExists = appData.recipes.some(item => item.id === currentDetailId);

  if (currentDetailId && !currentRecipeStillExists) {
    closeDetail();
    currentDetailId = null;
  }

  renderFilters();
  updateSelectedTags();
  renderRecipes();

  if (currentDetailId && detailModal.classList.contains("show")) {
    openDetail(currentDetailId);
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
}

function isFilterSelected(type, item) {
  if (type === "category") {
    return selectedCategories.includes(item);
  }

  if (type === "taste") {
    return selectedTastes.includes(item);
  }

  return selectedIngredients.includes(item);
}

function renderFilterGroup(container, items, type) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `chip ${getColorClass(index)}`;
    button.textContent = item;
    button.dataset.value = item;

    if (isFilterSelected(type, item)) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      toggleFilter(type, item, button);
    });

    container.appendChild(button);
  });
}

function getColorClass(index) {
  const colors = ["cyan", "red", "yellow", "gray", "green"];
  return colors[index % colors.length];
}

function renderFilters() {
  renderFilterGroup(categoryFilters, appData.categories, "category");
  renderFilterGroup(tasteFilters, appData.tastes, "taste");
  renderFilterGroup(ingredientFilters, appData.ingredients.slice(0, 12), "ingredient");
}

function toggleFilter(type, value, element) {
  let targetArray;

  if (type === "category") {
    targetArray = selectedCategories;
  } else if (type === "taste") {
    targetArray = selectedTastes;
  } else {
    targetArray = selectedIngredients;
  }

  const exists = targetArray.includes(value);

  if (exists) {
    targetArray.splice(targetArray.indexOf(value), 1);
    element.classList.remove("selected");
  } else {
    targetArray.push(value);
    element.classList.add("selected");
  }

  updateSelectedTags();
  renderRecipes();
}

function getMatchedScore(recipe) {
  if (selectedIngredients.length === 0) return 0;

  return recipe.ingredients.filter(ingredient =>
    selectedIngredients.some(selected =>
      ingredient.includes(selected) || selected.includes(ingredient)
    )
  ).length;
}

function getMissingIngredients(recipe) {
  return recipe.ingredients.filter(ingredient =>
    !selectedIngredients.some(selected =>
      ingredient.includes(selected) || selected.includes(ingredient)
    )
  );
}

function getFilteredRecipes() {
  const keyword = globalSearch.value.trim();
  const favorites = getFavorites();

  let list = appData.recipes.filter(recipe => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(item => recipe.category.includes(item));

    const matchTaste =
      selectedTastes.length === 0 ||
      selectedTastes.some(item => recipe.taste.includes(item));

    const matchIngredient =
      selectedIngredients.length === 0 ||
      selectedIngredients.some(item =>
        recipe.ingredients.some(ing => ing.includes(item) || item.includes(ing))
      );

    const matchKeyword =
      keyword === "" ||
      recipe.name.includes(keyword) ||
      recipe.category.some(item => item.includes(keyword)) ||
      recipe.taste.some(item => item.includes(keyword)) ||
      recipe.ingredients.some(item => item.includes(keyword));

    const matchPage =
      currentPage === "favorite" ? favorites.includes(recipe.id) : true;

    return matchCategory && matchTaste && matchIngredient && matchKeyword && matchPage;
  });

  if (currentPage === "recommend" || selectedIngredients.length > 0) {
    list = list.sort((a, b) => {
      const scoreB = getMatchedScore(b);
      const scoreA = getMatchedScore(a);
      return scoreB - scoreA;
    });
  }

  return list;
}

function renderRecipes() {
  const recipes = getFilteredRecipes();
  recipeGrid.innerHTML = "";

  if (recipes.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  recipes.forEach((recipe, index) => {
    const missingIngredients = getMissingIngredients(recipe);
    const matchedScore = getMatchedScore(recipe);

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="recipe-img">
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
          onerror="this.src='${fallbackImages[index % fallbackImages.length]}'"
        />

        <span class="need-badge">
          ${
            selectedIngredients.length === 0
              ? "查看所需食材"
              : missingIngredients.length === 0
                ? "食材已齐全"
                : `还需要：${missingIngredients.length} 种`
          }
        </span>
      </div>

      <div class="recipe-info">
        <h3>${recipe.name}</h3>

        <div class="recipe-tags">
          ${recipe.category.map(tag => `<span class="mini-tag">${tag}</span>`).join("")}
          ${recipe.taste.slice(0, 2).map(tag => `<span class="mini-tag">${tag}</span>`).join("")}
        </div>

        <p class="ingredients">
          主料：
          ${recipe.ingredients.map(item => {
            const hasIt = selectedIngredients.some(selected =>
              item.includes(selected) || selected.includes(item)
            );

            if (selectedIngredients.length === 0) {
              return `<span>${item}</span>`;
            }

            return hasIt
              ? `<span class="have">${item} ✓</span>`
              : `<span class="missing">${item} ×</span>`;
          }).join("、")}
        </p>

        <div class="card-footer">
          <span>匹配度：${selectedIngredients.length === 0 ? "待输入" : matchedScore + "/" + recipe.ingredients.length}</span>
          <button class="detail-btn" data-id="${recipe.id}">查看详情</button>
        </div>
      </div>
    `;

    recipeGrid.appendChild(card);
  });

  document.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", () => openDetail(button.dataset.id));
  });
}

function updateSelectedTags() {
  selectedTags.innerHTML = "";

  const allTags = [
    ...selectedCategories,
    ...selectedTastes,
    ...selectedIngredients
  ];

  const allButton = document.createElement("button");
  allButton.className = allTags.length === 0 ? "tag active" : "tag";
  allButton.textContent = "全部";
  allButton.addEventListener("click", clearAllFilters);
  selectedTags.appendChild(allButton);

  allTags.forEach(tag => {
    const button = document.createElement("button");
    button.className = "tag active";
    button.textContent = `${tag} ×`;
    button.addEventListener("click", () => removeTag(tag));
    selectedTags.appendChild(button);
  });
}

function removeTag(tag) {
  selectedCategories = selectedCategories.filter(item => item !== tag);
  selectedTastes = selectedTastes.filter(item => item !== tag);
  selectedIngredients = selectedIngredients.filter(item => item !== tag);

  document.querySelectorAll(".chip").forEach(chip => {
    if (chip.dataset.value === tag) {
      chip.classList.remove("selected");
    }
  });

  updateSelectedTags();
  renderRecipes();
}

function clearAllFilters() {
  selectedCategories = [];
  selectedTastes = [];
  selectedIngredients = [];
  globalSearch.value = "";
  ingredientInput.value = "";

  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.remove("selected");
  });

  updateSelectedTags();
  renderRecipes();
}

function addIngredientFromInput() {
  const value = ingredientInput.value.trim();

  if (!value) return;

  const ingredients = value
    .split(/[,，、\s]+/)
    .map(item => item.trim())
    .filter(Boolean);

  ingredients.forEach(item => {
    if (!selectedIngredients.includes(item)) {
      selectedIngredients.push(item);
    }
  });

  ingredientInput.value = "";
  updateSelectedTags();
  renderRecipes();
}

function openDetail(id) {
  const recipe = appData.recipes.find(item => item.id === id);
  if (!recipe) return;

  currentDetailId = id;

  detailImage.src = recipe.image;
  detailImage.onerror = () => {
    detailImage.src = fallbackImages[0];
  };

  detailTitle.textContent = recipe.name;
  detailSubtitle.textContent = `${recipe.category.join(" / ")} · ${recipe.taste.join(" / ")}`;

  detailMeta.innerHTML = `
    <span>⏱ ${recipe.time || "未知时间"}</span>
    <span>🔥 ${recipe.difficulty || "未知难度"}</span>
    <span>👥 ${recipe.servings || "1-2人"}</span>
  `;

  const missingIngredients = getMissingIngredients(recipe);

  detailIngredients.innerHTML = recipe.ingredients.map(item => {
    const hasIt = !missingIngredients.includes(item);
    return `
      <li class="${selectedIngredients.length > 0 && hasIt ? "have" : ""}">
        <span>${item}</span>
        ${
          selectedIngredients.length === 0
            ? ""
            : hasIt
              ? "<em>已有</em>"
              : "<em>缺少</em>"
        }
      </li>
    `;
  }).join("");

  detailSteps.innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join("");
  detailTips.textContent = recipe.tips || "暂无小贴士。";

  updateFavoriteButton();

  detailModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  detailModal.classList.remove("show");
  document.body.style.overflow = "";
}

function updateFavoriteButton() {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(currentDetailId);

  favoriteBtn.textContent = isFavorite ? "♥ 已收藏" : "♡ 收藏";
  favoriteBtn.classList.toggle("active", isFavorite);
}

function toggleFavorite() {
  if (!currentDetailId) return;

  const favorites = getFavorites();
  const index = favorites.indexOf(currentDetailId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(currentDetailId);
  }

  saveFavorites(favorites);
  updateFavoriteButton();

  if (currentPage === "favorite") {
    renderRecipes();
  }
}

function switchPage(page) {
  currentPage = page;

  document.querySelectorAll(".nav-item[data-page]").forEach(item => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  if (page === "discover") {
    pageTitle.textContent = "智能食材搜索";
    pageDesc.textContent = "输入已有食材，系统会自动推荐最接近的菜谱。";
  }

  if (page === "recommend") {
    pageTitle.textContent = "智能推荐";
    pageDesc.textContent = "根据你的已有食材，优先展示匹配度最高的菜谱。";
  }

  if (page === "favorite") {
    pageTitle.textContent = "我的收藏";
    pageDesc.textContent = "这里展示你收藏过的菜谱。";
  }

  renderRecipes();
}

document.querySelectorAll(".nav-item[data-page]").forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();
    switchPage(item.dataset.page);
  });
});

addIngredientBtn.addEventListener("click", addIngredientFromInput);

ingredientInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addIngredientFromInput();
  }
});

globalSearch.addEventListener("input", renderRecipes);

resetBtn.addEventListener("click", clearAllFilters);

detailMask.addEventListener("click", closeDetail);
detailClose.addEventListener("click", closeDetail);
favoriteBtn.addEventListener("click", toggleFavorite);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeDetail();
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearch.focus();
  }
});

/**
 * 关键修复：
 * 当后台 admin.html 改了 localStorage 后，
 * 首页重新获得焦点、重新显示、或者另一个页面触发 storage 事件时，
 * 自动重新读取数据并刷新列表。
 */
window.addEventListener("storage", event => {
  if (event.key === STORAGE_KEY || event.key === FAVORITE_KEY) {
    refreshAppData();
  }
});

window.addEventListener("focus", refreshAppData);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    refreshAppData();
  }
});

window.addEventListener("pageshow", refreshAppData);

renderFilters();
updateSelectedTags();
renderRecipes();