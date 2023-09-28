import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  Popover,
  Tooltip
} from 'bootstrap/dist/js/bootstrap.bundle.min.js'

var tooltipTriggerList = [].slice.call(document.querySelectorAll('mark'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
popoverTriggerList.map(function (popoverTriggerEl) {
  return new Popover(popoverTriggerEl)
})
