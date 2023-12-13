// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/BoxComponent.h"
#include "Mover.h"
#include "TriggerComponent.generated.h"

/**
 * Trigger component for blue print, mainly for detecting overlap of two objects
 */
UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class CRYPTRAIDER_API UTriggerComponent : public UBoxComponent
{
	GENERATED_BODY()

public:
	// Sets default values for this component's properties
	// UTriggerComponent constructor
	UTriggerComponent();

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;

	// dependency injection
	UFUNCTION(BlueprintCallable)
	void SetMover(UMover *Mover);

private:

	// must define and set AcceptableActorTag in actor and object that both overlap each other
	UPROPERTY(EditAnywhere)
	FName AcceptableActorTag;

	UMover *MoverPtr;

	bool ShouldMove = false;

	AActor *GetAcceptableActor() const;
};
