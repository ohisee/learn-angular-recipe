// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "BasePawn.generated.h"

UCLASS()
class TOONTANKS_API ABasePawn : public APawn
{
	GENERATED_BODY()

public:
	// Sets default values for this pawn's properties
	ABasePawn();

	UPROPERTY(VisibleAnywhere, BlueprintReadWrite) // BlueprintReadWrite to expose to event graph, cannot be private
	int32 VisibleAnywhereInt = 100;

	UPROPERTY(EditAnywhere, BlueprintReadOnly)
	int32 EditAnywhereInt = 100;

	UPROPERTY(VisibleInstanceOnly) // instance only, by dragging into unreal engine editor
	int32 VisibleInstanceOnlyInt = 100;

	UPROPERTY(VisibleDefaultsOnly) // only visible to default's detail panel
	int32 VisibleDefaultsOnlyInt = 10;

	UPROPERTY(EditDefaultsOnly)
	int32 EditDefaultsOnlyInt = 9;

	UPROPERTY(EditInstanceOnly)
	int32 EditInstanceOnlyInt = 19;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float speed = 200.f;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent *PlayerInputComponent) override;

private:
	// Cpp forward declaration, to avoid including UCapsuleComponent header file to keep this header file simpler
	// but this is incomplete type
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
	class UCapsuleComponent *CapsuleComponent;

	// UStaticMeshComponent is included in parent APawn class
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components",  meta = (AllowPrivateAccess = "true"))
	UStaticMeshComponent *BaseMeshComponent;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components",  meta = (AllowPrivateAccess = "true"))
	UStaticMeshComponent *TurretMeshComponent;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components",  meta = (AllowPrivateAccess = "true"))
	USceneComponent *ProjectileSpawnPoint;

	// expose private to event graph
	UPROPERTY(VisibleAnywhere, BlueprintReadWrite, Category = "Super Variables",  meta = (AllowPrivateAccess = "true"))
	int32 VisibleAnywhereIntPrivate = 100;

	// expose private to event graph
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Super Variables", meta = (AllowPrivateAccess = "true"))
	int32 EditAnywhereIntPrivate = 100;
};
