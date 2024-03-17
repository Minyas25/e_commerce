<?php

namespace App\Controller;

use App\Entity\Products;
use App\Form\ProductType;
use App\Repository\ProductsRepository;
use App\Service\Uploader;
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
class ProductController extends AbstractController
{
    private $entityManager;

    public function __construct(private ProductsRepository $repo, EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/products', methods: 'GET')]
    public function all(Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $pageSize = $request->query->get('pageSize', 5);

        // Récupérer tous les produits en fonction de la pagination
        return $this->json($this->repo->findBy([], limit: $pageSize, offset: ($page-1)*$pageSize));
    }

    #[Route('/product/{id}', methods: 'GET')]
    public function one(Products $products): JsonResponse
    {
        // Récupérer un produit par son ID
        return $this->json($products);
    }

    #[Route('/products', methods: ['POST'])]
    // public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
    // {
    //     try {
    //         // Désérialiser le contenu de la requête JSON en un objet Products
    //         $products = $serializer->deserialize($request->getContent(), Products::class, 'json');
    //     } catch (\Exception $e) {
    //         return $this->json('Invalid Body', 400); // En cas d'erreur de désérialisation, retourner une réponse JSON avec un code 400 (mauvaise requête)
    //     }

    //     // Persister l'objet Products et ses catégories associées dans la base de données
    //     $this->entityManager->persist($products);
    //     $this->entityManager->persist($products->getCategories());
    //     $this->entityManager->flush(); // Exécuter les opérations SQL pendantes
    //     return $this->json($products, 201); // Retourner une réponse JSON avec le produit créé et un code 201 (créé avec succès)
    // }
    public function add(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, Uploader $uploader, EntityManagerInterface $entityManager)
    {
        // $data = $request->toArray();
        // $movie = new Movie($data['title'], $data['resume'], new \DateTime($data['released']), $data['duration']);
        try {

            $products = $serializer->deserialize($request->getContent(), Products::class, 'json');
        } catch (\Exception $error) {
            return $this->json('Invalid body', 400);
        }
        $errors = $validator->validate($products);
        if ($errors->count() > 0) {
            return $this->json(['errors' => $errors], 400);
        }
        if($products->getImg()) {

            $filename = $uploader->upload($products->getImg());
            $products->setImg($filename);
        }
        $entityManager->persist($products);
        $entityManager->flush();

        return $this->json($products, 201);
    }
}