- This is a Playwright test file written in TypeScript that tests the functionality of a REST API provided by https://reqres.in/. The tests are written using the Jest testing framework.

- The first test checks whether a GET request to the /api/users endpoint returns a response with a 200 status code and a body containing a list of users.

- The second test checks whether a POST request to the /api/users endpoint with a request body containing a user's name and job information creates a new user and returns a response with a 201 status code and a body containing the created user's information.

- The third test checks whether a PUT request to the /api/users/{id} endpoint with a request body containing updated information for an existing user updates the user's information and returns a response with a 200 status code and a body containing the updated user's information.

- The fourth test checks whether a DELETE request to the /api/users/{id} endpoint with the ID of an existing user deletes the user and returns a response with a 204 status code. It also checks whether a subsequent GET request to the same endpoint with the same ID returns a response with a 404 status code, indicating that the user no longer exists.

# RUN
- npm run tests
- npx playwright test
- npx playwright test --reporter=html

