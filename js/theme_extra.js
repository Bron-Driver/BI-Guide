
/*
 * Assign 'docutils' class to tables so styling and
 * JavaScript behavior is applied.
 */
$('div.rst-content table').addClass('docutils');

/*
 * Gracefully replace any screenshot images that were not captured by the Internet Archive
 */
document.addEventListener('DOMContentLoaded', function() {
  var imgs = document.querySelectorAll('.rst-content img');
  imgs.forEach(function(img) {
    function handleMissing() {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      var box = document.createElement('div');
      box.className = 'archived-missing-image';
      var altText = img.getAttribute('alt');
      if (altText && altText.indexOf('Description automatically generated') !== -1) {
        altText = '';
      }
      box.innerHTML = '<span>Screenshot not captured in Internet Archive snapshot' + (altText ? ' (' + altText + ')' : '') + '</span>';
      if (img.parentNode) {
        img.parentNode.replaceChild(box, img);
      }
    }
    img.addEventListener('error', handleMissing);
    if (img.complete && img.naturalWidth === 0) {
      handleMissing();
    }
  });
});
