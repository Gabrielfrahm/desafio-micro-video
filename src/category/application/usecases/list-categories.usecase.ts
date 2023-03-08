import { PaginationOutputDto } from "../../../@seedwork/application/dtos/pagination-output.dto";
import { SearchInputDto } from "../../../@seedwork/application/dtos/search-input.dto";
import PaginationOutputMapper from "../../../@seedwork/application/mappers/pagination-output.mapper";
import UseCase from "../../../@seedwork/application/usecase";
import CategoryRepository from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dtos/category.dto";
import CategoryOutputMapper from "../mappers/category-output.mapper";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}
  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepository.search(params);
    return this.toOutPut(searchResult);
  }

  private toOutPut(
    searchResult: CategoryRepository.CategorySearchResult
  ): Output {
    return {
      items: searchResult.items.map((item) =>
        CategoryOutputMapper.toOutPut(item)
      ),
      ...PaginationOutputMapper.toPaginationOutput(searchResult),
    };
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
