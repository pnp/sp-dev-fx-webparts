$(document).ready(function () {
  $('#requests').DataTable({
    'ajax': {
      'url': "../../_api/web/lists/getbytitle('IT Requests')/items?$select=ID,BusinessUnit,Category,Status,DueDate,AssignedTo/Title&$expand=AssignedTo/Title",
      'headers': { 'Accept': 'application/json;odata=nometadata' },
      'dataSrc': function (data) {
        return data.value.map(function (item) {
          return [
            item.ID,
            item.BusinessUnit,
            item.Category,
            item.Status,
            new Date(item.DueDate),
            item.AssignedTo.Title
          ];
        });
      }
    },
    columnDefs: [{
      targets: 4,
      render: $.fn.dataTable.render.moment('YYYY/MM/DD')
    }]
  });
});