export class TestingUtilities {
    public static sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}