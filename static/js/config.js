function clean(code) {
  var spaced = code.replaceAll(/=/g, " = ").replaceAll(/,/g, ", ")
  var s1 = spaced.replace("StylesPath = styles", "StylesPath = styles\n")
  return s1.replace("Packages", "\nPackages")
}

function isAlpha(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

function read_form(editor) {
  var pkgs = [];
  var styles = ["Vale"];

  const base = $('#base-style').val();
  if (base !== "None") {
    pkgs.push(base);
    styles.push(base);
  }

  const comp = $('#comp-style').val();
  pkgs.push.apply(pkgs, comp);
  styles.push.apply(styles, comp);

  const ssg = $('#ssg').val();
  if (ssg !== "None") {
    pkgs.push(ssg);
  }

  const house = $('#house').val();
  if (house.length > 0 && isAlpha(house)) {
    styles.push(house.split(" ")[0]);
  }

  var code = editor.getValue();
  var parser = new ConfigIniParser();

  parser.parse(code);
  if (pkgs.length == 0) {
    parser.removeOption(null, "Packages")
  } else {
    parser.set(null, "Packages", pkgs)
  }

  parser.set("*", "BasedOnStyles", styles)

  editor.setValue(clean(parser.stringify()))
  editor.clearSelection();
}

$(function () {
  var editor = ace.edit("editor");

  editor.setTheme("ace/theme/kuroir");
  editor.session.setMode("ace/mode/ini");
  editor.setReadOnly(true);

  $("#cfg-gen").on('submit', function () {
    return false;
  });

  $('#base-style, #comp-style, #ssg, #house').on('change', function () {
    read_form(editor);
  });
});
