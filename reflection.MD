**Reflection: REST Countries API with Color Theme Switcher**

Developing the REST Countries API with Color Theme Switcher project helped me improve my skills in JavaScript, API integration, and responsive design. My goal was to display country information, including flags, population, region, capital, currencies, languages, and border countries, while also providing light and dark themes.

One of the main challenges was finding a suitable API. The original REST Countries API used by Frontend Mentor became a paid service, so I explored alternatives. Initially, I implemented the project using the provided data.json file. Then, I created a second version using an external API with a different data structure. This required adapting the retrieved data and handling errors when the API connection failed or certain information, such as a flag image, was unavailable. I also learned that API keys must be configured correctly and kept secure to prevent them from being uploaded to GitHub.

Another challenge was implementing responsive design. I used CSS Grid and Flexbox to organize the country cards and detail sections for desktop and mobile devices. I also used CSS variables and JavaScript to implement light and dark themes.

To solve these problems, I tested the application, checked errors in the browser console, and adjusted my JavaScript and CSS code. This process helped me understand the importance of debugging, code reusability, and separating responsibilities between HTML, CSS, and JavaScript.

In the future, I would improve the application by using a single version with a fallback strategy. First, the application would request information from the API. If the API failed or the data was unavailable, it would use an alternative source, such as a local JSON file or another data provider. This approach would make the application more reliable and ensure that country information remains available even when the API encounters problems.