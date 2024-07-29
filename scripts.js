async function fetchImages() {
    try {
        const response = await fetch('http://localhost:3000/images');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const images = await response.json();
        console.log('Fetched images:', images); // Log the fetched images
        return images;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

fetchImages().then(images => {
    if (!images || images.length === 0) {
        console.error('No images found');
        return;
    }
    let index = 0;

    function changeImages_1() {
        const box1 = document.getElementById('box2');
        box1.style.backgroundImage = `url(public/${images[index]})`;
        index = (index + 1) % images.length;
    }

    function changeImages_2() {
        const box2 = document.getElementById('box4');
        box2.style.backgroundImage = `url(public/${images[index]})`;
        index = (index + 1) % images.length;
    }

    function changeImages_3() {
        const box3 = document.getElementById('box3');
        box3.style.backgroundImage = `url(public/${images[index]})`;
        index = (index + 1) % images.length;
    }

    function changeImages_4() {
        const box4 = document.getElementById('box1');
        box4.style.backgroundImage = `url(public/${images[index]})`;
        index = (index + 1) % images.length;
    }

    const box = document.querySelector('.imgFrame');
    let lastPosition = '';

    function triggerAtPosition(position) {
        switch(position) {
            case '0':
                changeImages_1();
                break;
            case '20':
                changeImages_2();
                break;
            case '50':
                changeImages_3();
                break;
            case '70':
                changeImages_4();
                break;
            default:
                break;
        }
    }

    // Function to log the custom property --position
    function logPosition() {
        const style = getComputedStyle(box);
        const position = style.getPropertyValue('--position').trim();

        if (position !== lastPosition) {
            triggerAtPosition(position);
            lastPosition = position;
        }
    }

    // Use setInterval to check the position at regular intervals
    setInterval(logPosition, 2000); // Check every 20s

}).catch(error => {
    console.error('Error fetching images:', error);
});
