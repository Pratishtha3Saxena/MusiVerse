
const defaultColor = '#eeeeee';

const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#040A66';
    });

    link.addEventListener('mouseout', () => {
        link.style.color = defaultColor;
    });
});
