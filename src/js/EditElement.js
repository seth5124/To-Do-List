/**
 *  Replaces a node with an edit box that will update that node's data and HTML
 * @param {Node} node Node to be replaced
 * @param {Function} reloadFunction Function that should reload the data's UI elements
 * @param {Function} replaceFunction Function that should handle updating the data
 * @param {Type} inputType Type of input that should be generated to handle the data
 * @param {List} options Used when the input is selected from a list. This contains the list options
 */
export function editElement(
    node,
    reloadFunction,
    replaceFunction,
    inputType = "text",
    options = [],
) {
    let originalNode = node;
    let editBox = document.createElement("input");
    editBox.setAttribute("type", inputType);
    if(inputType == 'select'){
        editBox = document.createElement("select"); 
        for(let option in options){
            editBox.appendChild(Object.assign(document.createElement('option'),{
                innerHTML: options[option].name,
                value: options[option].value
            }))
        }
    }
    node.replaceWith(editBox);
    editBox.value = originalNode.innerHTML;
    editBox.focus();
    editBox.addEventListener("change", (e) => {
            let newValue = editBox.value;
            if(newValue.length < 1){
                alert("Value cannot be blank!");
                return;
            }
            originalNode.innerHTML = newValue;
            editBox.blur();
            editBox.replaceWith(originalNode);
            replaceFunction(newValue);
            reloadFunction();

    });
}
