const findName = name => author => author.uid === name;
const authorEdgesToList = authorEdges => authorEdges.map(edge => edge.node);

class AuthorModel {
  static hasAuthor(authorEdges, authorUid) {
    const authorList = authorEdgesToList(authorEdges);
    return Boolean(authorList.find(findName(authorUid)));
  }

  static getAuthor(authorEdges, authorUid, fallbackId) {
    const authorList = authorEdgesToList(authorEdges);
    if (this.hasAuthor(authorEdges, authorUid)) {
      return authorList.find(findName('juan'));
    }
    return authorList.find(findName('juan'));
  }
}

export default AuthorModel;
