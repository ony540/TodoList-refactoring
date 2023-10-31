const Footer = function () {
  const footerNode = document.createElement("footer");
  const pNode = document.createElement("p");
  const content = document.createTextNode("FESP-01 Project5");
  pNode.appendChild(content);
  footerNode.appendChild(pNode);
  return footerNode;
};

export default Footer;
