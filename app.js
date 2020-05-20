// Get the form, imageContainer, the loadingGIF and API URL
const form = document.getElementById('#searchForm');
const imageContainer = document.getElementsByClassName('image-container')[0];
const loadingGif = document.getElementById('loadingGIF');
const API_URL = 'https://nature-image-api.now.sh/search?q=';

// initially, set the display of the loading image to none
loadingGif.style.display = 'none';

// add a submit event listener to the form
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // display the loading image
    loadingGif.style.display = '';

    // clear previous search results if their have been any
    imageContainer.innerHTML = '';

    // parse form data
    const formData = new FormData(form);
    const searchTerm = formData.get('searchTerm');

    // basic error handling, prevent further action if the search term is invalid, e.g It is not a number, or an empty string
    if (!isNaN(searchTerm)) {
        loadingGif.style.display = 'none';
        const errorP = document.createElement('h2');
        errorP.innerHTML = 'Please enter a valid search Term';
        imageContainer.append(errorP);
    } else {
        const finalSearch = `${API_URL}${searchTerm}`;
        // fetch image JSON data from the API
        try {
            const response = await fetch(finalSearch);
            const json = await response.json();
            // call the display images function to manipulate the DOM and append the fetched images
            displayImages(json.images);
        } catch (error) {
            console.error(err.status);
        }
    }
});

const displayImages = (images) => {
    // Set the loadingGIF display to none
    loadingGif.style.display = 'none';
    images.forEach((image) => {
        // Create an image element for each fetched image and append them to the corresponding DOM section
        const imageElement = document.createElement('img');
        imageElement.src = image.image;
        imageContainer.append(imageElement);
    });
};
