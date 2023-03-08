import CategoryInMemoryRepository from "../../../../category/infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.usecase";

describe("Create category use case test", () => {
  let repository: CategoryInMemoryRepository;
  let usecase: CreateCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new CreateCategoryUseCase(repository);
  });

  it("should create a new category", async () => {
    const spyRepository = jest.spyOn(repository, "insert");
    let output = await usecase.execute({ name: "some name" });
    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "some name",
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });

    output = await usecase.execute({
      name: "some name",
      description: "some description",
      is_active: false,
    });
    expect(spyRepository).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "some name",
      description: "some description",
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
