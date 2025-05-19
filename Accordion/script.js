document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      // Close all other accordion items
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });

      // Toggle current accordion item
      header.classList.toggle('active');
      const content = header.nextElementSibling;
      content.classList.toggle('active');
    });
  });
}); 