import { EssentialDataServiceType } from "../../types/types";

type VendorCategoriesProps = {
  categories: EssentialDataServiceType[]
};

export default function VendorCategories({ categories }: VendorCategoriesProps) {
  return (
    <ul role="list" className="space-y-4 py-3 text-sm font-medium text-gray-900">
      <span className="text-xs uppercase font-normal text-gray-900">Категории</span>

      {categories.map((category) => (
        <li key={category.value}>
          <a href={category.value} className="inline-block text-gray-900 ml-2 hover:text-indigo-600">
            {category.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
