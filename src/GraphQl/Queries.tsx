import {gql} from '@apollo/client';

export const GET_BRANDS = gql`
    query {
        findAllBrands {
            id
            name
            image
        }
    }
`;

export const GET_UNIQUE_BRAND = gql`
    query FindUniqueBrand($id: ID!) {
        findUniqueBrand(id: $id) {
            id
            name
        }
    }
`;

export const GET_BRAND_MODELS = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export const GET_SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;