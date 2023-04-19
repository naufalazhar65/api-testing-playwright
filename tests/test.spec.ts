import { test, expect } from '@playwright/test';

test.describe.parallel('API TESTING', () => {
  const baseURL = 'https://reqres.in/api';

  test('should get a user', async ({ page }) => {
    // Send GET request to the users endpoint
    const response = await page.goto(`${baseURL}/users?page=2`);
  
    // Check if the response status code is 200 OK
    expect(response?.status()).toBe(200);
  
    // Check if the response body contains a list of users
    const responseBody = await response?.json();
    expect(responseBody?.data).toBeDefined();
    expect(Array.isArray(responseBody?.data)).toBe(true);
  });

  test('should create a user', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Naufal',
        job: 'Software Engineer'
      }
    });
    // Verify the response status code
    expect(response.status()).toBe(201);

    // Verify the response body
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Naufal');
    expect(responseBody.job).toBe('Software Engineer');
    expect(responseBody.id).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
  });

  test('should update a user', async ({ request }) => {
    // Create a new user to be updated
    const createUserResponse = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Naufal',
        job: 'Software Engineer'
      }
    });
    const user = JSON.parse(await createUserResponse.text());

    // Update the user's information
    const updateUserResponse = await request.put(`${baseURL}/users/${user.id}`, {
      data: {
        name: 'Naufal',
        job: 'Web Developer'
      }
    });

    // Verify the response status code
    expect(updateUserResponse.status()).toBe(200);

    // Verify the response body
    const updatedUser = JSON.parse(await updateUserResponse.text());
    expect(updatedUser.name).toBe('Naufal');
    expect(updatedUser.job).toBe('Web Developer');
    expect(updatedUser.updatedAt).toBeDefined();
  });

  test('should delete a user', async ({ request }) => {
    // Create a new user to delete
    const createResponse = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Naufal',
        job: 'Software Engineer'
      }
    });
    const user = JSON.parse(await createResponse.text());
  
    // Delete the user
    const deleteResponse = await request.delete(`${baseURL}/users/${user.id}`);

    // Verify the response status code
    expect(deleteResponse.status()).toBe(204);

    // Verify that the user was deleted
    const getResponse = await request.get(`${baseURL}/users/${user.id}`);
    expect(getResponse.status()).toBe(404);
  });
});
