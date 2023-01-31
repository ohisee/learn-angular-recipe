// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "BasePawn.h"
#include "Tank.generated.h"

/**
 * This is Tank pawn component.
 */
UCLASS()
class TOONTANKS_API ATank : public ABasePawn
{
	GENERATED_BODY()

public:
	ATank();

	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent *PlayerInputComponent) override;

	// Called every frame
	virtual void Tick(float DeltaTime) override;

	// handles the destruction of Tank
	void HandleDestruction();

	APlayerController *GetTankPlayerController() const { return PlayerController; }

	bool bAlive = true;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

private:
	UPROPERTY(VisibleAnywhere, Category = "Components")
	class USpringArmComponent *SpringArmComponent;

	UPROPERTY(VisibleAnywhere, Category = "Components")
	class UCameraComponent *CameraComponent;

	UPROPERTY(EditAnywhere, Category = "Movement")
	float Speed = 200.f;

	UPROPERTY(EditAnywhere, Category = "Movement")
	float TurnRate = 80.f;

	void Move(float Value);

	void Turn(float Value);

	APlayerController *PlayerController;
};
