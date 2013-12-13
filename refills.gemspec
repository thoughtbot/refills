# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'refills/version'

Gem::Specification.new do |spec|
  spec.name          = "refills"
  spec.version       = Refills::VERSION
  spec.authors       = ["Joël Quenneville", "Magnus Gyllensward", "Christian Reuter", "Lisa Sy", "Paul Smith"]
  spec.email         = ["magnus@thoughtbot.com"]
  spec.description   = %q{Refills}
  spec.summary       = %q{Refills}
  spec.homepage      = "http://thoughtbot.github.io/refills/"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
