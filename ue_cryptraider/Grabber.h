// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/SceneComponent.h"
#include "PhysicsEngine/PhysicsHandleComponent.h"
#include "Grabber.generated.h"

UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class CRYPTRAIDER_API UGrabber : public USceneComponent
{
	GENERATED_BODY()

public:
	// Sets default values for this component's properties
	UGrabber();

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction) override;

	UFUNCTION(BluePrintCallable)
	void Release();

	UFUNCTION(BluePrintCallable)
	void Grab();

private:
	UPROPERTY(EditAnywhere)
	float MaxGrabDistance = 400; // in centimeter

	UPROPERTY(EditAnywhere)
	float GrabRadius = 100; // 1 meter

	UPROPERTY(EditAnywhere)
	float HoldDistance = 200;

	UPhysicsHandleComponent *GetPhysicsHandle() const;

	bool GetGrabbableInReach(FHitResult &OutHitResult) const;

	// put const to indicate a reference that cannot change, read only
	// void PrintDamage(const float &DamageReference);

	// out parameter, without using const
	// bool HasDamage(float &OutDamage);
};
