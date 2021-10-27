import { ValidationArguments } from 'class-validator';

export const ErrorMessages = {
  lengthMessage: (isMin = true) => {
    return (validationData: ValidationArguments) => {
      const tailleMessage = isMin
        ? 'La taille minimale est :'
        : 'La taille maximale est :';
      return `La taille du champ ${validationData.property} est inadéquate. ${tailleMessage} ${validationData.constraints[0]}`;
    };
  },
  emptyMessage: `le champ $property est obligatoire`,
};
