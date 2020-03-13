import Search from "./models/Search";
import * as searchView from "./views/searchView";
import {
  elements,
  renderLoader,
  clearLoader
} from "./views/base";
/*
! Global State of the app =======================================================================================
- Search Object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
  //TODO: Get query from view
  const query = searchView.getInput();

  if (query) {
    //TODO: New search object and add to state
    state.search = new Search(query);

    //TODO: Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    //TODO: Search for recipes
    await state.search.getResults();

    //TODO: Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result)

    console.log(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  console.log(btn);

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }


});

/* ===================================== END ========================================================================= */