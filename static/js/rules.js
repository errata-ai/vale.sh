$(document).ready(function () {
  var dt = $('#rule-explorer').DataTable({
    "bLengthChange": false,
    "ordering": false,
    "dom": "<'row row-cols-1'<'col'l><'col'f>>" +
      "<'row row-cols-1'<'col'tr>>" +
      "<'row row-cols-1'<'col'i><'col'p>>",

  });

  $('.dataTable').on('click', 'tbody tr', function () {
    console.log('API row values : ', dt.row(this).data());
  })
});
