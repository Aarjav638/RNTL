package com.nativecalculator;

import android.content.Context;
import android.content.SharedPreferences;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReadableArray;
import com.nativecalculator.NativeCalculatorSpec;
import com.facebook.react.bridge.ReactApplicationContext;

public class NativeCalculatorModule extends NativeCalculatorSpec {

    private static final String NAME = "NativeCalculator";
    

    public NativeCalculatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    public static String getModuleName() {
        return NAME;
    }

    @Override
    public double add(ReadableArray args) {
        double sum = 0;
        for (int i = 0; i < args.size(); i++) {
            sum += args.getDouble(i);
        }
        return sum;
    }

}
