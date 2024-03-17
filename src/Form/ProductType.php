<?php

namespace App\Form;

use App\Entity\Categories;
use App\Entity\Products;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class ProductType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('sku')
            ->add('name', null, [
                // Ajoutez une contrainte de validation pour que le nom ne soit pas vide
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le nom ne peut pas être vide',
                    ]),
                ],
            ])
            ->add('description')
            ->add('img')
            ->add('active')
            ->add('stock')
            ->add('createdAt')
            ->add('updatedAt')
            ->add('categories', EntityType::class, [
                'class' => Categories::class,
'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Products::class,
        ]);
    }
}
