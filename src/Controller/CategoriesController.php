<?php

namespace App\Controller;

use App\Entity\Products;
use App\Form\ProductType;
use App\Repository\CategoriesRepository;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class CategoriesController extends AbstractController
{

    private $entityManager;

    public function __construct(private CategoriesRepository $repo ,EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/categories',methods:'GET')]
    public function all(Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $pageSize = $request->query->get('pageSize', 5);

        return $this->json($this->repo->findBy([], limit: $pageSize, offset: ($page-1)*$pageSize));
    }

    #[Route('/category/{id}', methods: 'GET')]
    public function one(Products $products) {
        return $this->json($products);
    }

    #[Route('/categories', methods: ['POST'])]
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
{
    try {
        $products = $serializer->deserialize($request->getContent(), Products::class, 'json');
    } catch (\Exception $e) {
        return $this->json('Invalid Body', 400);
    }

    $this->entityManager->persist($products);
    $this->entityManager->persist($products->getCategories());
    $this->entityManager->flush();
    return $this->json($products, 201);

    }
    
}
