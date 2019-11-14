let get_element = (obj, id) => Object.values(obj).map(x => x[id].toString());
let numnum = num => num > 9 ? ""+num : "0"+num;

var gid = Object.keys(goals);
var gnum = get_element(goals, "number").map(numnum);
var gdesc = get_element(goals, "description").join("</br>");

var get_img_path = (goal) => "SDG-Icons/Goal-"+numnum(goal.number.toString())+".png"

var get_img_option = (goal) => {
  return `
    <option
      data-img-class="sdg-icons"
      data-img-src="${get_img_path(goal)}" 
      value="${goal.number.toString()}">${goal.description.toString()}</option>
  `
}

var icon_grid = (goals) => Object.values(goals).map(get_img_option).join("")

document.getElementById("icon-grid").innerHTML = `
  <select class="image-picker show-html" data-limit="2" multiple="multiple">
    ${icon_grid(goals)}
  </select>
`

$('select').imagepicker({
  hide_select: true,
  show_label: false
})
