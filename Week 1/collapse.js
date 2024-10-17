function toggleCollapse(heading) {
    let parent = heading.parentElement;
    for (let child of parent.children) {
        if (child !== heading) {
            child.style.display === 'none' ?
                child.style.display = 'block' : child.style.display = 'none';
        }
    }
}

function makeCollapsible(heading) {
    heading.addEventListener('click', () => toggleCollapse(heading));
}

document.addEventListener("DOMContentLoaded", () => 
    document.querySelectorAll("h1, h2, h3").forEach(makeCollapsible));
