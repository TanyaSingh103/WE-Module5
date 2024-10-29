function createTocFigure() {
    let tocFigure = document.createElement("figure");
    let tocFigCaption = document.createElement("figcaption");
    tocFigCaption.innerText = "Table of Contents";
    tocFigure.append(tocFigCaption);
    return tocFigure;
}

function createTocListItem(href, linkText) {
    let tocItemElem = document.createElement("li");
    let anchorElem = document.createElement("a");
    anchorElem.href = href;
    anchorElem.innerText = linkText;
    tocItemElem.append(anchorElem);
    return tocItemElem;
}

function generateToc() {
    let tocFigure = createTocFigure();
    let tocElem = document.createElement("ol");
    
    let currentH1Item = null;
    let currentH1SubList = null;

    document.querySelectorAll("h1, h2").forEach((heading) => {
        if (heading.tagName === "H1") {
            let tocListItem = createTocListItem("#" + heading.id, heading.innerText);

            currentH1SubList = document.createElement("ol");
            tocListItem.append(currentH1SubList);
            tocElem.append(tocListItem);

            currentH1Item = tocListItem;
        } else if (heading.tagName === "H2" && currentH1Item) {
            let subItem = createTocListItem("#" + heading.id, heading.innerText);
            currentH1SubList.append(subItem);
        }
    });

    tocFigure.append(tocElem);

    document.querySelector("header").insertAdjacentElement("afterend", tocFigure);
}

document.addEventListener("DOMContentLoaded", generateToc);
