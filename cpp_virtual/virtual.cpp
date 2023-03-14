#include <iostream>
#include <string>

class Car
{
public:
    // set virtual in parent class
    virtual void Shout()
    {
        std::cout << "Loud!" << std::endl;
    }
};

class Jeep : public Car
{
public:
    void Shout() override
    {
        std::cout << "Pew!" << std::endl;
    }
};

// demonstrate dynamic dispatching
int main()
{
    Car MyCar;
    // MyCar.Shout();

    Jeep MyJeep;
    // MyJeep.Shout();

    Car *CarPtr;

    CarPtr = &MyCar;
    CarPtr->Shout();

    CarPtr = &MyJeep;
    CarPtr->Shout();
}