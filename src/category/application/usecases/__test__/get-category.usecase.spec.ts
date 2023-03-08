import { Category } from "../../../../category/domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../../category/infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.usecase";

describe("get category usecase unit test", () => {
  let repository: CategoryInMemoryRepository;
  let usecase: GetCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new GetCategoryUseCase(repository);
  });

  it("should thrown error when entity not found", async () => {
    expect(usecase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Entity Not Found Using ID fake id")
    );
  });

  it("should return a category", async () => {
    const items = [new Category({ name: "some name" })];
    repository.items = items;
    const spyRepository = jest.spyOn(repository, "findById");
    const output = await usecase.execute({ id: items[0].id });
    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "some name",
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
  });
});
