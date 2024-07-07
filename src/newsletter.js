export const subscribeToNewsletter=()=> {
    const newsletterForm = document.getElementById('NewsletterForm');

    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            alert('Please enter a valid email address.');
            return;
        }

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValue }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to subscribe. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            alert('Subscription successful! Thank you for subscribing.');
            newsletterForm.reset();
        })
        .catch(error => {
            alert(error.message || 'An error occurred. Please try again later.');
        });
    });
}