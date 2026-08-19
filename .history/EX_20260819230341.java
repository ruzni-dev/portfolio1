class Bike {
    final void run() {
        System.out.println("running");
    }
}

class Honda extends Bike {
    void run() { // compile time error
        System.out.println("running safely with 100kmph");
    }
}

public class ex {
    public static void main(String args[]) {
        Honda honda = new Honda();
        honda.run();
    }
}