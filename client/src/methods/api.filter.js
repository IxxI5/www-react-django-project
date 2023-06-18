/**
 * @param {*} data
 * @returns a new data structure where data are grouped by the publishedAt property
 */
function dataConverter(data) {
  let articles = [];

  Array.from(data).forEach((item) => {
    let article = {
      publishedAt: "",
      sourceName: "",
      title: "",
      url: "",
    };

    article.publishedAt = item.publishedAt.slice(0, 10);
    article.sourceName = item.source.name;
    article.title = item.title;
    article.url = item.url;

    articles.push(article);
  });

  const sorted = articles.sort((a, b) =>
    sortingByDate(a.publishedAt, b.publishedAt)
  ); // sorted by date ascending

  return groupByDate(sorted);
}

/**
 * @param {*} d1
 * @param {*} d2
 * @param {*} sortMethod : asc: ascending, desc: descending
 * @returns sorting by date
 */
function sortingByDate(d1, d2, sortMethod = "asc") {
  const date1 = new Date(d1).getTime();
  const date2 = new Date(d2).getTime();

  if (date1 === date2) return 0;
  if (date1 < date2) {
    if (sortMethod === "desc") {
      return 1;
    } else {
      return -1;
    }
  } else {
    if (sortMethod === "desc") {
      return -1;
    } else {
      return 1;
    }
  }
}

/**
 * @param {*} data
 * @description: group data by publishedAt
 */
function groupByDate(data) {
  const groupBy = Array.from(data).reduce((group, article) => {
    const { publishedAt } = article;
    group[publishedAt] = group[publishedAt] ?? [];
    group[publishedAt].push(article);
    return group;
  });

  return groupBy;
}

/**
 * @description: bundle all functions into an object
 */
const filter = {
  dataConverter: (data) => dataConverter(data),
  sortingByDate: (d1, d2, sortMethod = "asc") =>
    sortingByDate(d1, d2, (sortMethod = "asc")),
  groupByDate: (data) => groupByDate(data),
};

export default filter;
