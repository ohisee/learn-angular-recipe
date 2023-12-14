// Fill out your copyright notice in the Description page of Project Settings.

#include "TriggerComponent.h"

// Sets default values for this component's properties
// UTriggerComponent constructor
UTriggerComponent::UTriggerComponent()
{
    // Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
    // off to improve performance if you don't need them.
    PrimaryComponentTick.bCanEverTick = true;
}

// Called when the game starts
void UTriggerComponent::BeginPlay()
{
    Super::BeginPlay();

    // UE_LOG(LogTemp, Display, TEXT("Trigger component begin play"));
}

// Called every frame
void UTriggerComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction *ThisTickFunction)
{
    Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

    AActor *Actor = GetAcceptableActor();
    if (Actor != nullptr)
    {
        // Cast Actor's root component which is a USceneComponent into a UPrimitiveComponent
        // If Actor's root component is not a UPrimitiveComponent and cannot be casted to UPrimitiveComponent
        // it will return a null pointer
        UPrimitiveComponent *Component = Cast<UPrimitiveComponent>(Actor->GetRootComponent());
        if (Component != nullptr)
        {
            Component->SetSimulatePhysics(false);
            UE_LOG(LogTemp, Warning, TEXT("Trigger component Set Simulate Physics to false"));
        }
        Actor->AttachToComponent(this, FAttachmentTransformRules::KeepWorldTransform);

        // UE_LOG(LogTemp, Display, TEXT("Unlocking"));
        if (MoverPtr != nullptr)
        {
            MoverPtr->SetShouldMove(true);
        }
        else
        {
            UE_LOG(LogTemp, Warning, TEXT("in unlocking mover is not ready"));
        }
    }
    else
    {
        UE_LOG(LogTemp, Display, TEXT("No actor found"));
        if (MoverPtr != nullptr)
        {
            MoverPtr->SetShouldMove(false);
        }
        else
        {
            UE_LOG(LogTemp, Warning, TEXT("in relocking mover is not ready"));
        }
    }

    // TArray<AActor *> Actors;
    // GetOverlappingActors(Actors);

    // if (Actors.Num() > 0)
    // {
    //     FString Name = Actors[0]->GetActorNameOrLabel();
    //     UE_LOG(LogTemp, Display, TEXT("Actor name %s"), *Name);
    // }

    // int32 index = 0;
    // while (index < Actors.Num())
    // {
    //     FString ActorName = Actors[index]->GetActorNameOrLabel();
    //     UE_LOG(LogTemp, Display, TEXT("Actor name %s"), *ActorName);
    //     ++index;
    // }

    // for (int32 i = 0; i < Actors.Num(); i++)
    // {
    //     FString ActorName = Actors[i]->GetActorNameOrLabel();
    //     UE_LOG(LogTemp, Display, TEXT("Actor name %s"), *ActorName);
    // }

    // range based loop
    // for (AActor *Actor : Actors)
    // {
    //     // FString ActorName = Actor->GetActorNameOrLabel();
    //     // UE_LOG(LogTemp, Display, TEXT("Actor name %s"), *ActorName);

    //     // for (FName Name : Actor->Tags)
    //     // {
    //     //     UE_LOG(LogTemp, Display, TEXT("Tags %s"), *Name.ToString());
    //     // }

    //     // if (Actor->ActorHasTag("Unlock1"))
    //     // {
    //     //     UE_LOG(LogTemp, Display, TEXT("Unlocking"));
    //     // }

    //     if (Actor->ActorHasTag(AcceptableActorTag))
    //     {
    //         UE_LOG(LogTemp, Display, TEXT("Unlocking"));
    //     }
    // }
}

AActor *UTriggerComponent::GetAcceptableActor() const
{
    TArray<AActor *> Actors;
    GetOverlappingActors(Actors);
    for (AActor *Actor : Actors)
    {
        UE_LOG(LogTemp, Display, TEXT("GetAcceptableActor %s"), *Actor->GetActorNameOrLabel());
        bool HasAccceptableTag = Actor->ActorHasTag(AcceptableActorTag);
        bool IsGrabbed = Actor->ActorHasTag("Grabbed");
        if (HasAccceptableTag && !IsGrabbed)
        {
            return Actor;
        }
    }

    return nullptr;
}

void UTriggerComponent::SetMover(UMover *NewMoverPtr)
{
    MoverPtr = NewMoverPtr;
    // UE_LOG(LogTemp, Display, TEXT("Set mover %s"), *GetOwner()->GetActorNameOrLabel());
}
