package com.example.QuickQuiz_backend.support;

import org.junit.jupiter.api.Test;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.mock.env.MockEnvironment;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TestDatabaseSafetyInitializerTest {

    private final TestDatabaseSafetyInitializer initializer = new TestDatabaseSafetyInitializer();

    @Test
    void allowsTestProfileWithInMemoryH2() {
        GenericApplicationContext context = context(
                new MockEnvironment()
                        .withProperty("spring.profiles.active", "test")
                        .withProperty("spring.datasource.url", "jdbc:h2:mem:safety"));
        context.getEnvironment().setActiveProfiles("test");

        assertDoesNotThrow(() -> initializer.initialize(context));
    }

    @Test
    void rejectsRealDatabaseUrl() {
        GenericApplicationContext context = context(
                new MockEnvironment()
                        .withProperty("spring.datasource.url", "jdbc:mysql://localhost:3306/quickquiz"));
        context.getEnvironment().setActiveProfiles("test");

        IllegalStateException exception =
                assertThrows(IllegalStateException.class, () -> initializer.initialize(context));

        assertTrue(exception.getMessage().contains("non-memory datasource"));
    }

    @Test
    void rejectsMissingTestProfile() {
        GenericApplicationContext context = context(
                new MockEnvironment()
                        .withProperty("spring.datasource.url", "jdbc:h2:mem:safety"));

        IllegalStateException exception =
                assertThrows(IllegalStateException.class, () -> initializer.initialize(context));

        assertTrue(exception.getMessage().contains("'test' profile"));
    }

    private GenericApplicationContext context(MockEnvironment environment) {
        GenericApplicationContext context = new GenericApplicationContext();
        context.setEnvironment(environment);
        return context;
    }
}
