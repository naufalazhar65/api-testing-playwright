import { test, expect } from '@playwright/test';

test.describe.parallel('API TESTING', () => {
  const baseURL = 'https://reqres.in/api';

  test('should get a user', async ({ page }) => {
    const response = await page.goto(`${baseURL}/users?page=2`);
  
    // Memeriksa apakah kode status respons 200 OK
    expect(response?.status()).toBe(200);
  
    // Memeriksa apakah isi respons berisi daftar pengguna
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
    // Memeriksa kode status respons
    expect(response.status()).toBe(201);

    // Memeriksa isi respons
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Naufal');
    expect(responseBody.job).toBe('Software Engineer');
    expect(responseBody.id).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
  });

  test('should update a user', async ({ request }) => {
    const createUserResponse = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Naufal',
        job: 'Software Engineer'
      }
    });
    const user = JSON.parse(await createUserResponse.text());

    const updateUserResponse = await request.put(`${baseURL}/users/${user.id}`, {
      data: {
        name: 'Naufal',
        job: 'Web Developer'
      }
    });

    // Memeriksa kode status respons
    expect(updateUserResponse.status()).toBe(200);

    // Memeriksa isi respons
    const updatedUser = JSON.parse(await updateUserResponse.text());
    expect(updatedUser.name).toBe('Naufal');
    expect(updatedUser.job).toBe('Web Developer');
    expect(updatedUser.updatedAt).toBeDefined();
  });

  test('should delete a user', async ({ request }) => {
    const createResponse = await request.post(`${baseURL}/users`, {
      data: {
        name: 'Naufal',
        job: 'Software Engineer'
      }
    });
    const user = JSON.parse(await createResponse.text());
  
    const deleteResponse = await request.delete(`${baseURL}/users/${user.id}`);

    // Memeriksa kode status respons
    expect(deleteResponse.status()).toBe(204);

    // Memeriksa apakah pengguna telah dihapus
    const getResponse = await request.get(`${baseURL}/users/${user.id}`);
    expect(getResponse.status()).toBe(404);
  });
});
