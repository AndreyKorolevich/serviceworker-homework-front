export default class Widget {
  constructor(container, url) {
    this.container = container;
    this.url = url;
    this.data = null;
  }

  async start() {
    this.addBlock();
    setTimeout(() => {
      if (this.data === null) this.showModule();
    }, 2000);
    try {
      this.data = await this.api();
      this.hiddenModule();
      this.container.innerHTML = '';
      this.data.news.forEach((e) => this.addNews(e));
    } catch (e) {
      console.error(e);
    }
  }

  addNews(elem) {
    const article = document.createElement('article');
    article.classList.add('article');
    article.innerHTML = `
   <header class="article__header">${elem.date}</header>
      <div class="summary">
        <div class="avatar"><img src="${elem.avatar}"></div>
        <div class="text">${elem.text}</div>
      </div>
  `;
    this.container.appendChild(article);
  }

  addBlock() {
    const article = document.createElement('article');
    article.classList.add('article');
    const string = `
        <article class="article">
            <header class="article__header cover"></header>
                <div class="summary">
                <div class="avatar cover"></div>
                 <div class="text cover"></div>
                </div>
        </article> `.repeat(3);
    this.container.innerHTML = string;
  }

  /* eslint-disable */
  showModule() {
    document.querySelector('.module').classList.remove('hidden');
  }

  hiddenModule() {
    document.querySelector('.module').classList.add('hidden');
  }

  async api() {
    try {
      const data = await fetch(this.url);
      return data.json();
    } catch (e) {
      console.error(e);
    }
  }
}
