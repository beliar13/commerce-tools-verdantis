import { FC, ReactNode, useEffect, useState } from 'react';

import { ButtonGroup } from '@mui/material';

import { getParentCategories } from '@/lib/axios/requests/get-parent-categories';
import { useTokenStore } from '@/stores/token-store';

import { NavigationCategory } from './navigation-category';
// import { Category } from '@/lib/axios/requests/schemas/get-categories-schema';

import { getChildCategories } from '@/lib/axios/requests/get-child-categories';

export type CategoryData = {
  id: string;
  name: string;
};

export const CategoriesNavigation: FC<{
  children?: ReactNode;
}> = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const { token } = useTokenStore();

  useEffect(() => {
    if (!token) {
      throw new Error('Token expected');
    }
    getParentCategories(token).then(
      (categoriesResponse) => {
        const childCategoryPromises = categoriesResponse.map((category) =>
          getChildCategories(category.id, token),
        );
        // categoriesResponse.forEach((category: Category)=>{
        //   getChildCategories(category.id, token).then((result)=>{console.log(`child categories for ${category.key}`,result)})

        Promise.all(childCategoryPromises).then(
          (childCategoriesResults) => {
            const categoryNamesAndIds = categoriesResponse.map((category, index) => ({
              children: childCategoriesResults[index],
              id: category.id,
              name: category.name['en-US'],
            }));

            setCategories(categoryNamesAndIds);
          },
          (err) => console.error(err),
        );
        // })
        // const categoryNamesAndIds = categoriesResponse.map((category) => ({
        //   id: category.id,
        //   name: category.name['en-US'],
        // }));

        // setCategories(categoryNamesAndIds);
      },

      (err) => {
        console.error(err);
      },
    );
  }, [token]);

  return categories.length > 0 ? (
    <ButtonGroup aria-label="Vertical button group" orientation="vertical" variant="contained">
      {categories.map((category) => {
        return <NavigationCategory category={category} key={category.id} />;
      })}
    </ButtonGroup>
  ) : (
    <>no categories available</>
  );
};
