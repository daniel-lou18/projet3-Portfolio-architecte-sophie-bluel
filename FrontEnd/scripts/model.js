const BASE_URL = "http://localhost:5678/api";

export const state = {
  projects: [],
  categories: [],
};

export async function loadProjects() {
  try {
    const res = await fetch(`${BASE_URL}/works`);
    if (!res.ok) throw new Error("Impossible de récupérer les projets");
    const data = await res.json();
    console.log(data);
    state.projects = [...data];
  } catch (err) {
    console.error(err);
  }
}

export async function loadCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Impossible de récupérer les catégories");
    const data = await res.json();
    state.categories = new Set(data.map((cat) => cat.name));
  } catch (err) {
    console.error(err);
  }
}

export function getFilteredProjects(filterValue) {
  try {
    if (state.projects.length === 0 || state.categories.length === 0)
      throw new Error("Impossible de filtrer les projets");
    const filteredProjects = state.projects.filter(
      (project) =>
        project.categoryId - 1 ===
        Array.from(state.categories).indexOf(filterValue)
    );
    return filteredProjects;
  } catch (err) {
    console.error(err);
  }
}
