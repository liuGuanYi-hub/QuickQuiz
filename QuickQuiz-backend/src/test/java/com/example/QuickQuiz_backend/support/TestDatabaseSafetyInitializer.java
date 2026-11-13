package com.example.QuickQuiz_backend.support;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.util.Arrays;

public final class TestDatabaseSafetyInitializer
        implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final String TEST_PROFILE = "test";
    private static final String IN_MEMORY_H2_PREFIX = "jdbc:h2:mem:";

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        String datasourceUrl = environment.getProperty("spring.datasource.url", "");
        boolean testProfileActive = Arrays.asList(environment.getActiveProfiles()).contains(TEST_PROFILE);

        if (!testProfileActive) {
            throw new IllegalStateException(
                    "Refusing to start tests without the 'test' profile. "
                            + "This prevents test cleanup from reaching a real database.");
        }

        if (!datasourceUrl.startsWith(IN_MEMORY_H2_PREFIX)) {
            throw new IllegalStateException(
                    "Refusing to start tests with a non-memory datasource: " + datasourceUrl);
        }
    }
}
