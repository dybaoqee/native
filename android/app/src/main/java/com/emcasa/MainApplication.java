package com.emcasa;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.multidex.MultiDex;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.sudoplz.reactnativeamplitudeanalytics.RNAmplitudeSDKPackage;
import io.sentry.RNSentryPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.microsoft.codepush.react.CodePush;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.rpt.reactnativecheckpackageinstallation.CheckPackageInstallationPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ShareApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  protected ReactNativeHost createReactNativeHost() {
    return new NavigationReactNativeHost(this) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }

      @Override
      protected String getJSBundleFile() {
          return CodePush.getJSBundleFile();
      }
    };
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNAmplitudeSDKPackage(MainApplication.this),
      new RNSentryPackage(),
      new RNSpinkitPackage(),
      new LinearGradientPackage(),
      new CodePush(
        getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
        getApplicationContext(),
        BuildConfig.DEBUG),
      new RNAccountKitPackage(),
      new CheckPackageInstallationPackage(),
      new FBSDKPackage(mCallbackManager),
      new RNFirebasePackage(),
      new RNFirebaseRemoteConfigPackage(),
      new RNFirebaseMessagingPackage(),
      new RNFirebaseNotificationsPackage(),
      new RNFirebaseAnalyticsPackage(),
      new RNSharePackage(),
      new ImagePickerPackage(),
      new SvgPackage(),
      new PhotoViewPackage(),
      new MapsPackage()
    );
  }

  @Override
  public String getFileProviderAuthority() {
    return "com.emcasa.provider";
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
    AppEventsLogger.activateApp(this);
  }
}
