import { BookReviewItem } from '@/models/book.model';
import { fakerKO as faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

const mockReviewData: BookReviewItem[] = Array.from({ length: 15 }).map(() => {
  return {
    id: faker.number.int(),
    userName: `${faker.person.lastName() + faker.person.firstName()}`,
    content: faker.lorem.lines(),
    createdAt: faker.date.past({ refDate: new Date() }).toISOString(),
    score: faker.number.int({ min: 1, max: 5 }),
  };
});

export const reviewsById = http.get('http://localhost:3000/reviews/:bookId', () => {
  return HttpResponse.json(mockReviewData, { status: 200 });
});
