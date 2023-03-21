import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1, and there are other pages
    if (currPage === 1 && numPages > 1)
      return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          currPage + 1
        }" >
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
    // page 1 , and there are no pages
    if (currPage === 1 && numPages <= 1) return '';
    // last page
    if (currPage === numPages)
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
    `;
    // other pages
    if (currPage > 1 && numPages > 1)
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-goto="${
          currPage + 1
        }" >
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
